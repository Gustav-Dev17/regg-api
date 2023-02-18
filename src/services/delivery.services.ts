import { IDelivery, IRequestDeliveryBody } from "../types/delivery.body.types";
import { ReadSelectedItemsById, UpdateSelectedItems } from "../repositories/selected.items.repository";
import {
  CreateDeliveriesRepo,
  CheckExistingAwaitingDeliveries,
  ReadDeliveryByID,
  ReadDeliveries,
  ReadDeliveriesByUser,
  ReadDeliveriesByUserAndStatus,
  ReadDeliveriesByTransporter,
  ReadDeliveriesByTransporterAndStatus,
  ReadDeliveryToPay,
  UpdateDelivery,
  DeleteDelivery,
} from "../repositories/delivery.repositories";

import { StatusTypes } from "../types/delivery.body.types";

export const CreateDeliveryService = async (body: IDelivery, id: string) => {
  try {
    const existingDelivery = await CheckExistingAwaitingDeliveries(id, "Waiting" as StatusTypes);

    if (existingDelivery.length > 0) {
      throw new Error("Já existe uma entrega em espera!");
    } else {
      return CreateDeliveriesRepo(body);
    }
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadDeliveryService = (id: string) => {
  try {
    return ReadDeliveryByID(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadDeliveriesService = (pageNumber: number) => {
  try {
    return ReadDeliveries(pageNumber);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadDeliveriesByUserService = (id: string, pageNumber: number) => {
  try {
    return ReadDeliveriesByUser(id, pageNumber);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadDeliveriesByUserAndStatusService = (id: string, pageNumber: number, status: StatusTypes) => {
  try {
    return ReadDeliveriesByUserAndStatus(id, pageNumber, status);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadDeliveryToBePaidService = (id: string) => {
  try {
    return ReadDeliveryToPay(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const SimulatePaymentService = async (transpId: string) => {
  try {
    const deliveryToPay = await ReadDeliveryToPay(transpId);

    if (deliveryToPay) {
      return UpdateDelivery({ isPaid: true }, deliveryToPay?.id);
    } 
    else {
      throw new Error("Não foi encontrada uma entrega a ser paga!");
    }
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadDeliveriesByTransporterService = (id: string, pageNumber: number) => {
  try {
    return ReadDeliveriesByTransporter(id, pageNumber);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadDeliveriesByTransporterAndStatusService = (id: string, pageNumber: number, status: StatusTypes) => {
  try {
    return ReadDeliveriesByTransporterAndStatus(id, pageNumber, status);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const UpdateDeliveryService = async (body: IRequestDeliveryBody, id: string, userType: string, transpId: string) => {
  try {
    const delivery = await ReadDeliveryByID(id);

    if (userType === "Client") {
      if (delivery?.status === "Waiting" || delivery?.status === "Accepted" || delivery?.status === "Refused") {
        if (body.status === "Cancelled") {
          return DeleteDeliveryService(id);
        }
      } else {
        throw new Error("Você não tem permissão para alterar o status da entrega!");
      }
    }

    if (userType === "Transporter") {
      if (body.status === "Refused" || body.status === "Cancelled") {
        const status = body.status || (delivery?.status as StatusTypes);
        return UpdateDelivery({ status, transporterId: null }, id);
      }
      if (body.status === "Accepted") {
        const hasUnpaid = await ReadDeliveryToPay(transpId);
        if (hasUnpaid) {
          throw new Error("Há uma entrega com pagamento pendente! Para realizar novas entregas, efetue o pagamento.");
        } else {
          const status = body.status || (delivery?.status as StatusTypes);
          return UpdateDelivery({ status }, id);
        }
      }
      if (body.status === "InProgress") {
        const status = body.status || (delivery?.status as StatusTypes);
        return UpdateDelivery({ status }, id);
      }
      if (body.status === "Finished") {
        try {
          const selectedItemId = delivery?.selectedItemsId as string;
          const status = "Finished" as StatusTypes;
          await UpdateSelectedItems({ status }, selectedItemId); //atualiza status dos items
        } catch (e) {
          throw new Error((e as Error).message);
        }
        const status = body.status || (delivery?.status as StatusTypes);
        return UpdateDelivery({ status }, id);
      } else {
        throw new Error("Algo deu errado!");
      }
    }
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const DeleteDeliveryService = (id: string) => {
  try {
    return DeleteDelivery(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const UpdateTransporterInDeliveryService = async (id: string, userType: string, transporterId: string) => {
  try {
    if (userType === "Client") {
      return UpdateDelivery({ transporterId, status: "Waiting" }, id);
    } else {
      throw new Error("Você não tem permissão para alterar o status da entrega!");
    }
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
