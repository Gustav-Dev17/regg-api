import { Response } from "express";
import { paymentConfig } from "../config/payment.config";

import { ReadDeliveryToBePaidService, MakePaymentService } from "../services/delivery.services";

import { UpdateDelivery } from "../repositories/delivery.repositories";

const mercadopago = require("mercadopago");
mercadopago.configurations.setAccessToken(paymentConfig.access_token);

export const CreateImmediateChargeService = async (
  transporterId: string,
  transporterName: string,
  transporterCPF: string,
  transporterEmail: string,
  deliveryId: string,
  deliveryPrice: number,
) => {
  const rawPrice = deliveryPrice * 0.05;
  const roundedPrice = rawPrice.toFixed(2);

  const names: string[] = transporterName.split(" ");
  const firstName: string = names[0];
  const lastName: string = names[names.length - 1];

  const deliveryToPay = await ReadDeliveryToBePaidService(transporterId); //Retorna a entrega e verifica se ela já tem um paymentIf

  if (deliveryToPay) {
    
    if (deliveryToPay.paymentId != null && deliveryToPay.paymentId !== "") {
      const paymentData = await mercadopago.get("/v1/payments/" + deliveryToPay.paymentId);

      const dateString = paymentData.response.date_of_expiration;
      const expirationDate = new Date(dateString);

      if (expirationDate.getTime() > Date.now()) {
        //Se a data de pagamento não expirou ainda, então que retorne o pagamento ainda existente

        return {
          payment_existence: "Existing payment",
          delivery_id: deliveryId.toString().toUpperCase(),
          total: roundedPrice,
          qrcode: paymentData.response.point_of_interaction.transaction_data.qr_code_base64,
          code: paymentData.response.point_of_interaction.transaction_data.qr_code,
        };
      }
    }

    //Se chegou aqui, significa que é a primeira vez que um pagamento é criado ou que a data do pagamento expirou, então um novo pagamento deverá ser criado

    const payment_data = {
      transaction_amount: (Math.random() * (0.10 - 0.01) + 0.01),
      description: "Pagamento de entrega N. " + deliveryId.toString().toUpperCase(),
      statement_descriptor: "Reggie App",
      payment_method_id: "pix",
      payer: {
        email: transporterEmail,
        first_name: firstName,
        last_name: lastName,
        identification: {
          type: "CPF",
          number: transporterCPF.replace(/\D/g, ""),
        },
      },
      metadata: {
        transporterId: transporterId,
        deliveryId: deliveryId,
      },
    };

    const chargeResponse = await mercadopago.payment.create(payment_data);

    //Adicionando o id do pagamento na tabela de delivery
    await UpdateDelivery({ paymentId: chargeResponse.response.id.toString() }, deliveryToPay?.id);

    return {
      payment_existence: "New payment",
      delivery_id: deliveryId.toString().toUpperCase(),
      total: roundedPrice,
      qrcode: chargeResponse.response.point_of_interaction.transaction_data.qr_code_base64,
      code: chargeResponse.response.point_of_interaction.transaction_data.qr_code,
    };
  }
};

export const CheckPaymentStatusService = async (paymentId: string, paymentAction: string) => {
  if (paymentAction === "payment.updated") {
    const paymentData = await mercadopago.get("/v1/payments/" + paymentId);

    if (paymentData.response.status == "approved") {
      const paidDelivery = await MakePaymentService(paymentData.response.metadata.transporter_id);
      return paidDelivery;
    }
  }
};
