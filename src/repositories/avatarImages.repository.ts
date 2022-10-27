import prisma from "../services/prisma.services";
import { IAvatarImages, IRequestAvatarImagesBody } from "../types/avatarImages.body.types";

export const CreateAvatarImagesRepo = (body: IAvatarImages) => {
  return prisma.avatarImages.create({
    data: body,
  });
};

export const ReadAvatarImagesRepo = () => {
  return prisma.avatarImages.findMany();
};

export const ReadAvatarImagesByIdRepo = (id: string) => {
  try {
    return prisma.avatarImages.findUnique({ where: { id } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadAvatarImagesByUserIdRepo = (userId: string) => {
  try {
    return prisma.avatarImages.findFirst({ where: { userId } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const UpdateAvatarImageRepo = (body: IRequestAvatarImagesBody, id: string) => {
  try {
    return prisma.avatarImages.update({
      where: { id },
      data: body,
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const DeleteAvatarImageRepo = (id: string) => {
  try {
    return prisma.avatarImages.delete({
      where: { id },
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
