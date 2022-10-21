import prisma from "../services/prisma.services";
import { IFurnitureImages, IRequestFurnitureImagesBody } from "../types/furnitureImages.body.types";

export const CreateFurnitureImagesRepo = (body: IFurnitureImages) => {
  return prisma.furnitureImages.create({ data: body });
};

export const ReadFurnitureImages = () => {
  return prisma.furnitureImages.findMany();
};

export const ReadFurnitureImageById = (id: string) => {
  try {
    return prisma.furnitureImages.findUnique({ where: { id } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadFurnitureByItemId = (itemId: string) => {
  try {
    return prisma.furnitureImages.findUnique({ where: { itemId } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadFurnitureImageByAltname = (image_altname: string) => {
  try {
    return prisma.furnitureImages.findFirst({ where: { image_altname } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const UpdateFurnitureImage = (body: IRequestFurnitureImagesBody, id: string) => {
  try {
    return prisma.furnitureImages.update({
      where: { id },
      data: body,
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const DeleteFurnitureImage = (id: string) => {
  try {
    return prisma.furnitureImages.delete({
      where: { id },
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
