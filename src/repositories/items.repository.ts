import prisma from "services/prisma.services";
import { Item, IRequestItemBody } from "types/item.body.types";

export const CreateItemsRepo = (body: Item) => {
  return prisma.items.create({ data: body });
};

export const ReadItemByID = (id: string) => {
  try {
    return prisma.items.findUnique({ where: { id } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadItems = () => {
  return prisma.items.findMany();
};

export const UpdateItem = (body: IRequestItemBody, id: string) => {
  try {
    return prisma.items.update({
      where: { id },
      data: body,
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const DeleteItem = (id: string) => {
  try {
    return prisma.items.delete({ where: { id } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
