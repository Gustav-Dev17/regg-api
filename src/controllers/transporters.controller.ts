import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { CreateTransporterService, DeleteTransporterService, ListTransporterService, ListTransportersService, UpdateTransporterService } from "../services/transporters.services";

export const CreateTransporter = async (req: Request, res: Response) => {
  try {
    const transporter = await CreateTransporterService(req.body);
    return res.status(201).json(transporter);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        if (e.meta?.target === "Transporters_cpf_key") {
          return res.status(409).json({ message: "CPF is already being used!" });
        }
        if (e.meta?.target === "Transporters_phone_key") {
          return res.status(409).json({ message: "Phone number is already being used!" });
        }
        if (e.meta?.target === "Transporters_email_key") {
          return res.status(409).json({ message: "E-mail address is already being used!" });
        }
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

export const ReadAllTransporters = async (req: Request, res: Response) => {
  try {
    if (req.query.page) {
      var pageNumber: number = parseInt(req.query.page as string);
      const transporters = await ListTransportersService(pageNumber);
      return res.status(200).json(transporters);
    } else {
      const transporters = await ListTransportersService();
      return res.status(200).json(transporters);
    }
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
        if (e.meta?.target === "Transporters_cpf_key") {
          return res.status(409).json({ message: "CPF is already being used!" });
        }
        if (e.meta?.target === "Transporters_phone_key") {
          return res.status(409).json({ message: "Phone number is already being used!" });
        }
        if (e.meta?.target === "Transporters_email_key") {
          return res.status(409).json({ message: "E-mail address is already being used!" });
        }
      }
      if (e.code === "P2023") {
        return res.status(400).json({ message: "Malformed id!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Transporter does not exist!" });
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
        return res.status(400).json({ message: "Malformed id!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Transporter does not exist!" });
      }
    }
    return res.status(400).json({ message: "Error when deleting transporter!", descripton: (e as Error).message });
  }
};
