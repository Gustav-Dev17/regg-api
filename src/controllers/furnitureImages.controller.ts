import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { UpdateFurnitureImages, ReadFurnitureImageId, UploadFurnitureImages, DeleteFurnitureImages } from "services/furnitureImages.services";

export const UploadFurnitureImage = async (req: Request, res: Response) => {
  try {
    const uploadImage = await UploadFurnitureImages({
      image_altname: req.body.image_altname,
      image_path: req.file?.path as string,
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
