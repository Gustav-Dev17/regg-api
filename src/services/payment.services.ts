import { Response } from "express";
import moment from "moment-timezone";
import Gerencianet from "gn-api-sdk-typescript";
import Credentials from "../config/payment.credentials.config";

const gerencianet = new Gerencianet(Credentials);

export const CreateImmediateChargeService = async (transporterName: string, transporterCPF: string, deliveryId: string, deliveryPrice: number) => {
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

  const charge = {
    calendario: {
      expiracao: timeUntilTarget,
    },
    devedor: {
      cpf: transporterCPF.replace(/\D/g, ""),
      nome: transporterName,
    },
    valor: {
      original: valueToPay.toFixed(2),
    },
    chave: String(process.env.PIX_KEY),
    infoAdicionais: [
      {
        nome: "Pagamento ao",
        valor: "Reggie App",
      },
      {
        nome: "Entrega/Transporte",
        valor: "N. " + deliveryId.toString().toUpperCase(),
      },
    ],
  };

  const chargeResponse = await gerencianet.pixCreateImmediateCharge([], charge);

  const QRcode = await GenerateQRCode(chargeResponse.loc.id);

  return {
    id_delivery: deliveryId.toString().toUpperCase(),
    total: valueToPay.toFixed(2),
    qrcode: QRcode.imagemQrcode,
    code: QRcode.qrcode,
    expiration_at: targetTime,
  };
};

export const GenerateQRCode = async (locid: string) => {
  let params = {
    id: locid,
  };

  const response = await gerencianet.pixGenerateQRCode(params);
  return response;
};
