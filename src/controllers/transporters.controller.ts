import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { 
  CreateTransporterService, 
  DeleteTransporterService, 
  ListTransporterService, 
  ListTransportersService, 
  UpdateTransporterService 
} from "services/transporters.services";

export const CreateTransporter = async (req: Request, res: Response) => {
  try {
    const transporter = await CreateTransporterService(req.body);
    return res.status(201).json(transporter);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ message: "Email address is already being used!" });
      }
    }
    return res.status(400).json({ message: "Error when creating transporter!", descripton: (e as Error).message });
  }
};

export const ReadTransporter = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const transporter = await ListTransporterService(id);
    return res.status(200).json(transporter);
  } catch (e) {
    return res.status(400).json({ message: "Error when listing transporter!", descripton: (e as Error).message });
  }
};

export const ReadAllTransporters = async (__: Request, res: Response) => {
  try {
    const transporters = await ListTransportersService();
    return res.status(200).json(transporters);
  } catch (e) {
    return res.status(400).json({ message: "Error when listing transporters!", descripton: (e as Error).message });
  }
};

export const UpdateTransporter = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const transporter = await UpdateTransporterService(req.body, id);
    return res.status(200).json(transporter);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ message: "Email address is already being used!" });
      }
      if (e.code === "P2023") {
        return res.status(409).json({ message: "Malformed id!" });
      }
      if (e.code === "P2025") {
        return res.status(409).json({ message: "Transporter does not exist!" });
      }
    }
    return res.status(400).json({ message: "Error when updating transporter!", descripton: (e as Error).message });
  }
};

export const DeleteTransporter = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const transporter = await DeleteTransporterService(id);
    return res.status(204).json(transporter);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2023") {
        return res.status(409).json({ message: "Malformed id!" });
      }
      if (e.code === "P2025") {
        return res.status(409).json({ message: "Transporter does not exist!" });
      }
    }
    return res.status(400).json({ message: "Error when deleting transporter!", descripton: (e as Error).message });
  }
};
