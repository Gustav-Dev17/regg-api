import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import {
  UploadAvatarImagesService,
  ReadAllAvatarImages,
  ReadAvatarImagesByUserId,
  ReadAvatarImagesById,
  UpdateAvatarImage,
  DeleteAvatarImages,
} from "services/avatarImages.services";

export const UploadAvatarImagesController = async (req: Request, res: Response) => {
  try {
    const uploadImage = await UploadAvatarImagesService({
      avatar_path: ("/" + req.file?.path) as string,
      userId: req.body.userId,
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

export const ReadAllAvatarImagesController = async (_req: Request, res: Response) => {
  try {
    const images = await ReadAllAvatarImages();
    if (images.length === 0) {
      return res.status(404).json({ message: "No images available!" });
    }
    return res.status(200).json(images);
  } catch (e) {
    return res.status(400).json({ message: "Error when listing images!", description: (e as Error).message });
  }
};

export const ReadAvatarImagesByIdController = async (req: Request, res: Response) => {
  try {
    const image = await ReadAvatarImagesById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "No images available with the provided id!" });
    }
    return res.status(200).json(image);
  } catch (e) {
    return res.status(400).json({ message: "Error when listing images!", description: (e as Error).message });
  }
};

export const ReadAvatarImagesByUserIdController = async (req: Request, res: Response) => {
  try {
    const userImage = await ReadAvatarImagesByUserId(req.params.id);
    if (!userImage) {
      return res.status(404).json({ message: "No images available with the provided id!" });
    }
    return res.status(200).json(userImage);
  } catch (e) {
    return res.status(400).json({ message: "Error when listing images!", description: (e as Error).message });
  }
};

export const UpdateAvatarImageController = async (req: Request, res: Response) => {
  try {
    const image = UpdateAvatarImage({ avatar_path: req.file?.path, userId: req.body.userId }, req.params.id);
    return res.status(200).json(image);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2023") {
        return res.status(409).json({ message: "Malformed id!" });
      }
      if (e.code === "P2025") {
        return res.status(409).json({ message: "Avatar Image does not exist" });
      }
    }
  }
};

export const DeleteAvatarImagesController = async (req: Request, res: Response) => {
  try {
    const image = DeleteAvatarImages(req.params.id);
    return res.status(204).json(image);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2023") {
        return res.status(409).json({ message: "Malformed id!" });
      }
      if (e.code === "P2025") {
        return res.status(409).json({ message: "Avatar Image does not exist" });
      }
    }
  }
};
