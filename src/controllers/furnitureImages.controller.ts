import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { UpdateFurnitureImages, ReadFurnitureImageId, ReadAllFurnitureImages, UploadFurnitureImages, DeleteFurnitureImages } from "services/furnitureImages.services";

export const UploadFurnitureImage = async (req: Request, res: Response) => {
  try {
    const uploadImage = await UploadFurnitureImages({
      image_altname: req.body.image_altname,
      image_path: '/' + req.file?.path as string,
    });
    return res.status(201).json(uploadImage);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ message: "Image already uploaded!" });
      }
    }
    return res.status(400).json({ message: "Error while uploading image", description: (e as Error).message });
  }
};

export const ReadAllFurnitureImage = async (_req: Request, res: Response) => {
    try {
        const images = await ReadAllFurnitureImages();
        if (images.length === 0) {
            return res.status(404).json({ message: "No images available!" });
        }
        return res.status(200).json(images);
    } catch (e) {
        return res.status(400).json({ message: "Error when listing images!", description: (e as Error).message });
    }
}

export const ReadFurnitureImagesById = async (req: Request, res: Response) => {
    try {
        const image = await ReadFurnitureImageId(req.params.id);
        if (!image) {
            return res.status(404).json({ message: "No images available with the provided id!" });
        }
        return res.status(200).json(image);
    } catch (e) {
        return res.status(400).json({ message: "Error when listing images!", description: (e as Error).message });
    }
}

export const ChangeFurnitureImage = async (req: Request, res: Response) => {
    try {
        const image = UpdateFurnitureImages({image_altname: req.body.image_altname, image_path: req.file?.path}, req.params.id);
        return res.status(200).json(image);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2023") {
                return res.status(409).json({ message: "Malformed id!" });
            }
            if (e.code === "P2025") {
                return res.status(409).json({ message: "Furniture Image does not exist" });
            }
        }
    }
}