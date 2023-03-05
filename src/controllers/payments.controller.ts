import { Request, Response } from "express";
import { ListTransporterService } from "../services/transporters.services";
import { ReadDeliveryToBePaidService } from "../services/delivery.services";
import { CreateImmediateChargeService } from "../services/payment.services";
import { Console } from "console";

export const WantPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const transporter = await ListTransporterService(id);
    const delivery = await ReadDeliveryToBePaidService(id);

    if (transporter && delivery && delivery.selectedItems) {
      const qrcode = await CreateImmediateChargeService(transporter.id, transporter.name, transporter.cpf, transporter.email, delivery.id, delivery.selectedItems.delivery_price);
      return res.status(200).json(qrcode);
    } else {
      throw new Error("Transportador ou entrega referente não encontrado(s)!");
    }
  } catch (e) {
    return res.status(400).json({ message: "Erro ao gerar código de pagamento", descripton: (e as Error).message });
  }
};

export const ConfirmPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const pass = req.query.mercadoPagoPass;

    if (id !== null && id !== "63fbd8fa3c2607578c917d78" && pass !== null && pass !== "8U%DJcp3Ij9KEEhCDXkNH%m#hJJpYLfVAY9Jb$6FcPSfHGkem4") {
      throw new Error("Solicitação de usuário inválida!");
    }

    const notificationData = req.body;

    return res.status(200).json({
      data: notificationData,
      passMP: pass,
    });

} catch (e) {
    return res.status(400).json({ message: "Erro ao confirmar pagamento", descripton: (e as Error).message });
  }
};
