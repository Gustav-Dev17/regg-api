import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { CreateItemService, DeleteItemService, ListItemService, ListItemsService, UpdateItemService } from "services/items.services";

export const CreateItem = async (req: Request, res: Response) => {
  try {
    const item = await CreateItemService(req.body);
    return res.status(201).json(item);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ message: "There's already an item with this name!" });
      }
    }
    return res.status(400).json({ message: "Error when creating item!", descripton: (e as Error).message });
  }
};

export const ReadItem = async (req: Request, res: Response) => {
  try {
    const item = await ListItemService(req.id);
    return res.status(200).json(item);
  } catch (e) {
    return res.status(400).json({ message: "Error when listing item!", descripton: (e as Error).message });
  }
};

export const ReadAllItems = async (__: Request, res: Response) => {
  try {
    const items = await ListItemsService();
    return res.status(200).json(items);
  } catch (e) {
    return res.status(400).json({ message: "Error when listing items!", descripton: (e as Error).message });
  }
};

export const UpdateItem = async (req: Request, res: Response) => {
  try {
    const item = await UpdateItemService(req.body, req.id);
    return res.status(200).json(item);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ message: "There's already an item with this name!" });
      }
      if (e.code === "P2023") {
        return res.status(409).json({ message: "Malformed id!" });
      }
      if (e.code === "P2025") {
        return res.status(409).json({ message: "Item does not exist!" });
      }
    }
    return res.status(400).json({ message: "Error when updating item!", descripton: (e as Error).message });
  }
};

export const DeleteItem = async (req: Request, res: Response) => {
  try {
    const item = await DeleteItemService(req.id);
    return res.status(204).json(item);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2023") {
        return res.status(409).json({ message: "Malformed id!" });
      }
      if (e.code === "P2025") {
        return res.status(409).json({ message: "Item does not exist!" });
      }
    }
    return res.status(400).json({ message: "Error when deleting item!", descripton: (e as Error).message });
  }
};