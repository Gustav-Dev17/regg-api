import prisma from "../services/prisma.services";
import { ISelectedItems, IRequestSelectedItemsBody } from "../types/selected.items.body.types";

export type StatusTypes = "InProgress" | "Finished" | "Selected";

export const CreateSelectedItemsRepo = (body: ISelectedItems) => {
  return prisma.selectedItems.create({ data: body });
};

export const ReadSelectedItemsByUserId = (userId: string) => {
  try {
    return prisma.selectedItems.findMany({ where: { userId } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadSelectedItemsById = (id: string) => {
  try {
    return prisma.selectedItems.findUnique({ where: { id } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadAllSelectedItems = () => {
  return prisma.selectedItems.findMany();
};

export const ReadSelectedItemsByUserIdAndStatus = (userId: string) => {
  try {
    const status = "Selected"
    return prisma.selectedItems.findFirst({ where: { userId, status } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const UpdateSelectedItems = (body: IRequestSelectedItemsBody, id: string) => {
  try {
    return prisma.selectedItems.update({
      where: { id },
      data: body,
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const DeleteSelectedItems = (id: string) => {
  try {
    return prisma.selectedItems.delete({ where: { id } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
