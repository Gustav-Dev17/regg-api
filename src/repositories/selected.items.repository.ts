import prisma from "../services/prisma.services";
import { ISelectedItems, IRequestSelectedItemsBody } from "../types/selected.items.body.types";

export type StatusTypes = "InProgress" | "Finished" | "Selected";

export const CreateSelectedItemsRepo = (body: ISelectedItems) => {
  return prisma.selectedItems.create({ data: body });
};

export const ReadSelectedItemsByUserId = (userId: string) => {
  return prisma.selectedItems.findMany({ where: { userId } });
};

export const ReadSelectedItemsById = (id: string) => {
  return prisma.selectedItems.findUnique({ where: { id } });
};

export const ReadAllSelectedItems = () => {
  return prisma.selectedItems.findMany();
};

export const ReadSelectedItemsByUserIdAndStatus = (userId: string) => {
  const status = "Selected";
  return prisma.selectedItems.findFirst({ where: { userId, status }, include: { user: true } });
};

export const UpdateSelectedItems = (body: IRequestSelectedItemsBody, id: string) => {
  return prisma.selectedItems.update({
    where: { id },
    data: body,
  });
};

export const DeleteSelectedItems = (id: string) => {
  return prisma.selectedItems.delete({ where: { id } });
};
