import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { CreateTransporterService, DeleteTransporterService, ListTransporterService, ListTransportersService, UpdateTransporterService } from "../services/transporters.services";

export const CreateTransporter = async (req: Request, res: Response) => {
  try {
    const transporter = await CreateTransporterService(req.body);
    return res.status(201).json({
      id: transporter.id,
      user_type: transporter.user_type,
      name: transporter.name,
      cpf: transporter.cpf,
      phone: transporter.phone,
      email: transporter.email,
      license_category: transporter.license_category,
      transport_license: transporter.transport_license,
      created_at: transporter.created_at,
      updated_at: transporter.updated_at,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        if (e.meta?.target === "Transporters_cpf_key") {
          return res.status(409).json({ message: "O CPF informado já está em uso!" });
        }
        if (e.meta?.target === "Transporters_phone_key") {
          return res.status(409).json({ message: "O telefone informado já está em uso!" });
        }
        if (e.meta?.target === "Transporters_email_key") {
          return res.status(409).json({ message: "O e-mail informado já está em uso!" });
        }
      }
    }
    return res.status(400).json({ message: "Erro ao criar a conta do transportador!", descripton: (e as Error).message });
  }
};

export const ReadTransporter = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const transporter = await ListTransporterService(id);
    return res.status(200).json({
      id: transporter?.id,
      user_type: transporter?.user_type,
      name: transporter?.name,
      cpf: transporter?.cpf,
      phone: transporter?.phone,
      email: transporter?.email,
      license_category: transporter?.license_category,
      transport_license: transporter?.transport_license,
      avatar_image: transporter?.avatar_image,
      created_at: transporter?.created_at,
      updated_at: transporter?.updated_at,
      vehicle: transporter?.vehicle,
    });
  } catch (e) {
    return res.status(400).json({ message: "Erro ao listar dados do transportador!", descripton: (e as Error).message });
  }
};

export const ReadTransporterWithId = async (req: Request, res: Response) => {
  try {
    const transporter = await ListTransporterService(req.params.id);
    return res.status(200).json({
      id: transporter?.id,
      user_type: transporter?.user_type,
      name: transporter?.name,
      cpf: transporter?.cpf,
      phone: transporter?.phone,
      email: transporter?.email,
      license_category: transporter?.license_category,
      transport_license: transporter?.transport_license,
      avatar_image: transporter?.avatar_image,
      created_at: transporter?.created_at,
      updated_at: transporter?.updated_at,
      vehicle: transporter?.vehicle,
    });
  } catch (e) {
    return res.status(400).json({ message: "Erro ao listar dados do transportador!", descripton: (e as Error).message });
  }
};

export const ReadAllTransporters = async (req: Request, res: Response) => {
  try {
    if (req.query.page) {
      const pageNumber = parseInt(req.query.page as string);
      const transporters = await ListTransportersService(pageNumber as number);
      return res.status(200).json(transporters);
    } else {
      const transporters = await ListTransportersService(1 as number);
      return res.status(200).json(transporters);
    }
  } catch (e) {
    return res.status(400).json({ message: "Erro ao listar transportadores!", descripton: (e as Error).message });
  }
};

export const UpdateTransporter = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const transporter = await UpdateTransporterService(req.body, id);
    return res.status(200).json({
      id: transporter.id,
      user_type: transporter.user_type,
      name: transporter.name,
      cpf: transporter.cpf,
      phone: transporter.phone,
      email: transporter.email,
      license_category: transporter.license_category,
      transport_license: transporter.transport_license,
      created_at: transporter.created_at,
      updated_at: transporter.updated_at,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        if (e.meta?.target === "Transporters_cpf_key") {
          return res.status(409).json({ message: "O CPF informado já está em uso!" });
        }
        if (e.meta?.target === "Transporters_phone_key") {
          return res.status(409).json({ message: "O telefone informado já está em uso!" });
        }
        if (e.meta?.target === "Transporters_email_key") {
          return res.status(409).json({ message: "O e-mail informado já está em uso!" });
        }
      }
      if (e.code === "P2023") {
        return res.status(400).json({ message: "Id malformado!!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Transportador não encontrado!" });
      }
    }
    return res.status(400).json({ message: "Erro ao atualizar dados do transportador!", descripton: (e as Error).message });
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
        return res.status(400).json({ message: "Id malformado!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Transportador não encontrado!" });
      }
    }
    return res.status(400).json({ message: "Erro ao deletar a conta do transportador!", descripton: (e as Error).message });
  }
};
