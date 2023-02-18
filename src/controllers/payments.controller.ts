import { Request, Response } from "express";
import { ListTransporterService } from "../services/transporters.services";
import { ReadDeliveryToBePaidService } from "../services/delivery.services";
import { CreateImmediateChargeService } from "../services/payment.services";

export const WantPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const transporter = await ListTransporterService(id);
    const delivery = await ReadDeliveryToBePaidService(id);

    if (transporter && delivery && delivery.selectedItems) {
      const qrcode = await CreateImmediateChargeService(transporter.name, transporter.cpf, delivery.id, delivery.selectedItems.delivery_price);
      return res.status(200).json(qrcode);
    } else {
      throw new Error("Transportador ou entrega referente não encontrado(s)!");
    }
  } catch (e) {
    return res.status(400).json({ message: "Erro ao gerar código de pagamento", descripton: (e as Error).message });
  }
};
