import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { CreateItemService, DeleteItemService, ListItemService, ListItemsService, UpdateItemService } from "../services/items.services";

export const CreateItem = async (req: Request, res: Response) => {
  try {
    const item = await CreateItemService(req.body);
    return res.status(201).json(item);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ message: "Já existe um item com esse nome!" });
      }
    }
    return res.status(400).json({ message: "Erro ao criar o item!", descripton: (e as Error).message });
  }
};

export const ReadItem = async (req: Request, res: Response) => {
  try {
    const item = await ListItemService(req.params.id);
    return res.status(200).json(item);
  } catch (e) {
    return res.status(400).json({ message: "Erro ao listar item!", descripton: (e as Error).message });
  }
};

export const ReadAllItems = async (__: Request, res: Response) => {
  try {
    const items = await ListItemsService();
    return res.status(200).json(items);
  } catch (e) {
    return res.status(400).json({ message: "Erro ao listar os itens!", descripton: (e as Error).message });
  }
};

export const UpdateItem = async (req: Request, res: Response) => {
  try {
    const item = await UpdateItemService(req.body, req.params.id);
    return res.status(200).json(item);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ message: "Já existe um item com esse nome!" });
      }
      if (e.code === "P2023") {
        return res.status(400).json({ message: "Id malformado!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Item não encontrado!" });
      }
    }
    return res.status(400).json({ message: "Erro ao atualizar o item!", descripton: (e as Error).message });
  }
};

export const DeleteItem = async (req: Request, res: Response) => {
  try {
    const item = await DeleteItemService(req.params.id);
    return res.status(204).json(item);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2023") {
        return res.status(400).json({ message: "Id malformado!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Item não encontrado!" });
      }
    }
    return res.status(400).json({ message: "Error ao deletar o item!", descripton: (e as Error).message });
  }
};
