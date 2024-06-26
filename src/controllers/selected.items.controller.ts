import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import {
  CreateSelectedItemsService,
  ListSelectedItemsByUserIdService,
  ListSelectedItemsByIdService,
  ListAllSelectedItemsService,
  ListSelectedItemsByUserIdAndStatusService,
  UpdateSelectedItemsService,
  DeleteSelectedItemsService,
} from "../services/selected.items.services";

export type StatusTypes = "InProgress" | "Finished" | "Selected";

export const CreateSelectedItems = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    req.body.userId = id;
    req.body.status = "Selected";
    const item = await CreateSelectedItemsService(req.body);
    return res.status(201).json(item);
  } catch (e) {
    return res.status(400).json({ message: "Erro na criação do pacote de itens!", descripton: (e as Error).message });
  }
};

export const ReadSelectedItemsById = async (req: Request, res: Response) => {
  try {
    const item = await ListSelectedItemsByIdService(req.params.id);
    return res.status(200).json(item);
  } catch (e) {
    return res.status(400).json({ message: "Erro ao listar itens selecionados!", descripton: (e as Error).message });
  }
};

export const ReadSelectedItemsByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const item = await ListSelectedItemsByUserIdService(id);
    return res.status(200).json(item);
  } catch (e) {
    return res.status(400).json({ message: "Erro ao listar itens selecionados!", descripton: (e as Error).message });
  }
};

export const ReadAllSelectedItems = async (__: Request, res: Response) => {
  try {
    const items = await ListAllSelectedItemsService();
    return res.status(200).json(items);
  } catch (e) {
    return res.status(400).json({ message: "Erro ao listar itens selecionados!", descripton: (e as Error).message });
  }
};

export const ReadSelectedItemsByUserIdAndStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const item = await ListSelectedItemsByUserIdAndStatusService(id);
    return res.status(200).json(item);
  } catch (e) {
    return res.status(400).json({ message: "Erro ao listar itens selecionados!", descripton: (e as Error).message });
  }
};

export const UpdateSelectedItems = async (req: Request, res: Response) => {
  try {
    const item = await UpdateSelectedItemsService(req.body, req.params.id);
    return res.status(200).json(item);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2023") {
        return res.status(400).json({ message: "Id malformado!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Pacote de itens não encontrado!" });
      }
    }
    return res.status(400).json({ message: "Erro ao atualizar pacote de itens!", descripton: (e as Error).message });
  }
};

export const DeleteSelectedItems = async (req: Request, res: Response) => {
  try {
    const item = await DeleteSelectedItemsService(req.params.id);
    return res.status(204).json(item);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2023") {
        return res.status(400).json({ message: "Id malformado!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Pacote de itens não encontrado!" });
      }
    }
    return res.status(400).json({ message: "Erro ao deletar pacote de itens!", descripton: (e as Error).message });
  }
};
