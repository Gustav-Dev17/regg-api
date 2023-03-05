import { Response } from "express";
import moment from "moment-timezone";
import { paymentConfig } from "../config/payment.config";

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

  const payment_data = {
    transaction_amount: Number(roundedPrice),
    description: "Pagamento de entrega N. " + deliveryId.toString().toUpperCase(),
    external_reference: deliveryId.toString(),
    statement_descriptor: "Reggie App",
    payment_method_id: "pix",
    payer: {
      id: transporterId,
      email: transporterEmail,
      identification: {
        type: "CPF",
        number: transporterCPF.replace(/\D/g, ""),
      },
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
