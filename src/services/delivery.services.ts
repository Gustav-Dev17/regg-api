import { IDelivery, IRequestDeliveryBody } from "./../types/delivery.body.types";
import { Request, Response } from "express";
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

export const CreateDeliveryService = async (body: IDelivery, id: string) => {
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
      if (delivery?.status === "Waiting" || "Accepted" || "Refused") {
        if (body.status === "Cancelled") {
          return DeleteDeliveryService(id);
        }
      } else {
        throw new Error("You cannot change the delivery's status");
      }
    }

    if (userType === "Transporter") {
      if (body.status === "Accepted" || "InProgress" || "Finished") {
        const status = body.status || (delivery?.status as StatusTypes);
        return UpdateDelivery({ status }, id);
      }
      if (body.status === "Refused" || "Cancelled") {
        const status = body.status || (delivery?.status as StatusTypes);
        const transporterId = "" || (delivery?.transporterId as string);
        return UpdateDelivery({ status, transporterId }, id);
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
