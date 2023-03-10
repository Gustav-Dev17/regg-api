import { Request, Response } from "express";
import { ListTransporterService } from "../services/transporters.services";
import { ReadDeliveryToBePaidService } from "../services/delivery.services";
import { CreateImmediateChargeService, CheckPaymentStatusService } from "../services/payment.services";
import { io } from "src/app";

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
  const { id } = req;
  const paymentId = req.body.data.id;
  const paymentAction = req.body.action;

  if (id === null || id !== "63fbd8fa3c2607578c917d78") {
    throw new Error("Solicitação de usuário inválida!");
  }

  const confirmation = await CheckPaymentStatusService(paymentId, paymentAction);

  if (confirmation) {
    io.to(id).emit("sendToTransporter", { update: true });
    return res.status(200).json("Entrega paga com sucesso!");
  }

  return res.status(201); //necessário pq o mercadopago espera esse retorno pra parar de enviar notificações.
};

