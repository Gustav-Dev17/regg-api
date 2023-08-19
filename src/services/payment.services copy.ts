import { Response } from "express";
import moment from "moment-timezone";
import { paymentConfig } from "../config/payment.config";

const mercadopago = require("mercadopago");
mercadopago.configurations.setAccessToken(paymentConfig.access_token);

export const CreateImmediateChargeService = async (transporterName: string, transporterCPF: string, transporterEmail: string, deliveryId: string, deliveryPrice: number) => {
  const fuso = "America/Manaus";
  const now = moment.tz(fuso);
  const targetTime = moment.tz(fuso).set({
    hour: 23,
    minute: 59,
    second: 0,
    millisecond: 0,
  });

  const timeUntilTarget = targetTime.diff(now, "seconds");
  const valueToPay = deliveryPrice * 0.05;

  const payment_data = {
    transaction_amount: Number(valueToPay),
    description: "Pagamento de entrega N. " + deliveryId.toString().toUpperCase(),
    external_reference: deliveryId.toString().toUpperCase(),
    payment_method_id: "pix",
    payer: {
      email: transporterEmail,
      identification: {
        type: "CPF",
        number: transporterCPF.replace(/\D/g, ""),
      },
    },
    // notification_url: "https://www.suaurl.com/notificacoes/",
  };

  const chargeResponse = await mercadopago.payment.create(payment_data);

  return {
    id_delivery: deliveryId.toString().toUpperCase(),
    total: valueToPay.toFixed(2),
    qrcode: chargeResponse.point_of_interaction.transaction_data.qr_code_base64,
    code: chargeResponse.point_of_interaction.transaction_data.qr_code,
  };
};
