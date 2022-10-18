import { IDelivery, IRequestDeliveryBody } from "./../types/delivery.body.types";
import { ReadSelectedItemsById, UpdateSelectedItems } from "repositories/selected.items.repository";
import {
  CreateDeliveriesRepo,
  ReadDeliveryByID,
  ReadDeliveries,
  ReadDeliveriesByUser,
  ReadDeliveriesByUserAndStatus,
  ReadDeliveriesByTransporter,
  ReadDeliveriesByTransporterAndStatus,
  UpdateDelivery,
  DeleteDelivery,
} from "repositories/delivery.repositories";

import { StatusTypes } from "types/delivery.body.types";

export const CreateDeliveryService = async (body: IDelivery) => {
  try {
    return CreateDeliveriesRepo(body);
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

export const UpdateDeliveryService = async (body: IRequestDeliveryBody, id: string, userType: string) => {
  try {
    const delivery = await ReadDeliveryByID(id);

    if (userType === "Client") {
      if (delivery?.status === "Waiting" || delivery?.status === "Accepted" || delivery?.status === "Refused") {
        if (body.status === "Cancelled") {
          return DeleteDeliveryService(id);
        }
      } else {
        throw new Error("You cannot change the delivery's status");
      }
    }

    if (userType === "Transporter") {
      if (body.status === "Refused" || body.status === "Cancelled") {
        const status = body.status || (delivery?.status as StatusTypes);
        return UpdateDelivery({ status, transporterId: null }, id);
      }
      if (body.status === "Accepted" || body.status === "InProgress") {
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
        throw new Error("Error. Something went wrong!");
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
