import prisma from "../services/prisma.services";
import { PgConfig } from "../config/pagination.config";
import { Item, IRequestItemBody } from "../types/item.body.types";

export const SearchItems = (key: string) => {
  return prisma.items.findMany({
    where: {
      title: {
        contains: key,
        mode: "insensitive",
      },
    },
  });
};

export const CreateItemsRepo = (body: Item) => {
  return prisma.items.create({ data: body });
};

export const ReadItemByID = (id: string) => {
  return prisma.items.findUnique({ where: { id } });
};

export const ReadItems = async (pageNumber: number) => {
  return prisma.items.findMany();
};

export const UpdateItem = (body: IRequestItemBody, id: string) => {
  return prisma.items.update({
    where: { id },
    data: body,
  });
};

export const DeleteItem = (id: string) => {
  return prisma.items.delete({ where: { id } });
};
