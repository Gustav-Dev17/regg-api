import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { UpdateFurnitureImages, ReadFurnitureImageId, ReadAllFurnitureImages, UploadFurnitureImages, DeleteFurnitureImages } from "../services/furnitureImages.services";

export const UploadFurnitureImage = async (req: Request, res: Response) => {
  try {
    const uploadImage = await UploadFurnitureImages({
      image_altname: req.body.image_altname,
      image_path: ("/" + req.file?.path) as string,
      itemId: req.body.itemId as string, //id do item
    });
    return res.status(201).json(uploadImage);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ message: "Imagem já existe!" });
      }
    }
    return res.status(400).json({ message: "Erro ao carregar a imagem!", description: (e as Error).message });
  }
};

export const ReadAllFurnitureImage = async (_req: Request, res: Response) => {
  try {
    const images = await ReadAllFurnitureImages();
    if (images.length === 0) {
      return res.status(404).json({ message: "!" });
    }
    return res.status(200).json(images);
  } catch (e) {
    return res.status(400).json({ message: "Erro ao listar as imagens!", description: (e as Error).message });
  }
};

export const ReadFurnitureImagesById = async (req: Request, res: Response) => {
  try {
    const image = await ReadFurnitureImageId(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Não há imagens correspondentes ao id!" });
    }
    return res.status(200).json(image);
  } catch (e) {
    return res.status(400).json({ message: "Erro ao listar as imagens!", description: (e as Error).message });
  }
};

export const ChangeFurnitureImage = async (req: Request, res: Response) => {
  try {
    const image = UpdateFurnitureImages({ image_altname: req.body.image_altname, image_path: req.file?.path }, req.params.id);
    return res.status(200).json(image); //não está retornando
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2023") {
        return res.status(409).json({ message: "Id malformado!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Imagem não encontrada!" });
      }
    }
  }
};

export const DeleteFurnitureImage = async (req: Request, res: Response) => {
  try {
    const image = DeleteFurnitureImages(req.params.id);
    return res.status(204).json(image);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2023") {
        return res.status(409).json({ message: "Id malformado!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Imagem não encontrada!" });
      }
    }
  }
};
