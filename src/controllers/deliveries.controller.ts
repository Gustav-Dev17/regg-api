import { StatusTypes } from "./../types/selected.items.body.types";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import {
  CreateDeliveryService,
  ReadDeliveryService,
  ReadDeliveriesService,
  ReadDeliveriesByUserService,
  ReadDeliveriesByUserAndStatusService,
  ReadDeliveriesByTransporterService,
  ReadDeliveriesByTransporterAndStatusService,
  UpdateDeliveryService,
  DeleteDeliveryService,
} from "services/delivery.services";

export const CreateDelivery = async (req: Request, res: Response) => {
  try {
    const { id } = req; //id do user
    req.body.userId = id;
    const delivery = await CreateDeliveryService(req.body);
    return res.status(201).json(delivery);
  } catch (e) {
    return res.status(400).json({ message: "Error when creating delivery!", descripton: (e as Error).message });
  }
};

export const ReadDelivery = async (req: Request, res: Response) => {
  try {
    const delivery = await ReadDeliveryService(req.params.id);
    return res.status(200).json(delivery);
  } catch (e) {
    return res.status(400).json({ message: "Error when listing delivery!", descripton: (e as Error).message });
  }
};

export const ReadAllDeliveries = async (req: Request, res: Response) => {
  try {
    const pageNumber: number = parseInt(req.query.page as string);
    const deliveries = await ReadDeliveriesService(pageNumber);
    return res.status(200).json(deliveries);
  } catch (e) {
    return res.status(400).json({ message: "Error when listing deliveries!", descripton: (e as Error).message });
  }
};

export const ReadDeliveriesByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const pageNumber: number = parseInt(req.query.page as string);
    const deliveries = await ReadDeliveriesByUserService(id, pageNumber);
    return res.status(200).json(deliveries);
  } catch (e) {
    return res.status(400).json({ message: "Error when listing user's deliveries!", descripton: (e as Error).message });
  }
};

export const ReadDeliveriesByUserAndStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const pageNumber: number = parseInt(req.query.page as string);
    const deliveries = await ReadDeliveriesByUserAndStatusService(id, pageNumber, req.query.status as StatusTypes);
    return res.status(200).json(deliveries);
  } catch (e) {
    return res.status(400).json({ message: "Error when listing user's deliveries by status!", descripton: (e as Error).message });
  }
};

export const ReadDeliveriesByTransporter = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const pageNumber: number = parseInt(req.query.page as string);
    const deliveries = await ReadDeliveriesByTransporterService(id, pageNumber);
    return res.status(200).json(deliveries);
  } catch (e) {
    return res.status(400).json({ message: "Error when listing user's deliveries!", descripton: (e as Error).message });
  }
};

export const ReadDeliveriesByTransporterAndStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const pageNumber: number = parseInt(req.query.page as string);
    const deliveries = await ReadDeliveriesByTransporterAndStatusService(id, pageNumber, req.query.status as StatusTypes);
    return res.status(200).json(deliveries);
  } catch (e) {
    return res.status(400).json({ message: "Error when listing user's deliveries by status!", descripton: (e as Error).message });
  }
};

export const UpdateDelivery = async (req: Request, res: Response) => {
  try {
    const { userType } = req;
    const delivery = await UpdateDeliveryService(req.body, req.params.id, userType);
    return res.status(200).json(delivery);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2023") {
        return res.status(400).json({ message: "Malformed id!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Delivery does not exist!" });
      }
    }
    return res.status(400).json({ message: "Error when updating delivery!", descripton: (e as Error).message });
  }
};

export const DeleteDelivery = async (req: Request, res: Response) => {
  try {
    await DeleteDeliveryService(req.params.id);
    return res.status(204).json();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2023") {
        return res.status(400).json({ message: "Malformed id!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Delivery does not exist!" });
      }
    }
    return res.status(400).json({ message: "Error when deleting delivery!", descripton: (e as Error).message });
  }
};
