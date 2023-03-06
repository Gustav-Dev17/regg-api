import moment from "moment-timezone";
import { Response } from "express";
import { paymentConfig } from "../config/payment.config";

import { MakePaymentService } from "../services/delivery.services";

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
  const rowPrice = deliveryPrice * 0.05;
  const roundedPrice = rowPrice.toFixed(2);

  const names: string[] = transporterName.split(" ");
  const firstName: string = names[0];
  const lastName: string = names[names.length - 1];

  const payment_data = {
    transaction_amount: 0.01,
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
  return {
    delivery_id: deliveryId.toString().toUpperCase(),
    total: roundedPrice,
    qrcode: chargeResponse.response.point_of_interaction.transaction_data.qr_code_base64,
    code: chargeResponse.response.point_of_interaction.transaction_data.qr_code,
  };
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
