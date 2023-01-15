import prisma from "../services/prisma.services";
import { PgConfig } from "../config/pagination.config";
import { Item, IRequestItemBody } from "../types/item.body.types";

export const SearchItems = (key: string) => {
  try {
    return prisma.items.findMany({
      where: {
        title: {
          contains: key,
          mode: "insensitive",
        },
      },
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

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

export const ReadItems = async (pageNumber: number) => {
  const totalCount = await prisma.items.aggregate({
    _count: true,
  });

  const totalPage = Math.ceil((totalCount._count as number) / PgConfig.perPage);

  const items = await prisma.items.findMany({
    take: PgConfig.perPage,
    skip: PgConfig.perPage * (pageNumber - 1),
  });

  return {
    totalCount: totalCount._count,
    totalPage,
    currentPage: pageNumber,
    items,
  };
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
