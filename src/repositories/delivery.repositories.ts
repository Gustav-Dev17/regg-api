import prisma from "../services/prisma.services";
import { PgConfig } from "../config/pagination.config";
import { IDelivery, IRequestDeliveryBody } from "../types/delivery.body.types";
import { StatusTypes } from "../types/delivery.body.types";

export const PossibleStatus = "Accepted" || "Cancelled" || "InProgress " || "Refused" || "Waiting";

export const CreateDeliveriesRepo = (body: IDelivery) => {
  return prisma.deliveries.create({ data: body });
};

export const ReadDeliveryByID = (id: string) => {
  try {
    return prisma.deliveries.findUnique({ where: { id } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadDeliveries = (pageNumber: number) => {
  return prisma.deliveries.findMany({
    include: {
      selectedItems: true,
      transporter: {
        include: {
          vehicle: true,
        },
      },
    },
    take: PgConfig.perPage,
    skip: PgConfig.perPage * (pageNumber - 1),
  });
};

export const ReadDeliveriesByUser = (userId: string, pageNumber: number) => {
  return prisma.deliveries.findMany({
    where: {
      AND: [{ userId: userId }],
      NOT: {
        status: "Finished",
      },
    },
    include: {
      selectedItems: true,
      transporter: {
        include: {
          vehicle: true,
        },
      },
    },
    take: PgConfig.perPage,
    skip: PgConfig.perPage * (pageNumber - 1),
    orderBy: { updated_at: "desc" },
  });
};

export const ReadDeliveriesByUserAndStatus = (userId: string, pageNumber: number, status: StatusTypes) => {
  return prisma.deliveries.findMany({
    where: { userId, status },
    include: {
      selectedItems: true,
      transporter: {
        include: {
          vehicle: true,
        },
      },
    },
    take: PgConfig.perPage,
    skip: PgConfig.perPage * (pageNumber - 1),
    orderBy: { updated_at: "desc" },
  });
};

export const ReadDeliveriesByTransporter = (transporterId: string, pageNumber: number) => {
  return prisma.deliveries.findMany({
    where: {
      AND: [{ transporterId: transporterId }],
      NOT: {
        status: "Finished",
      },
    },
    include: {
      selectedItems: true,
      user: true,
    },
    take: PgConfig.perPage,
    skip: PgConfig.perPage * (pageNumber - 1),
    orderBy: { updated_at: "desc" },
  });
};

export const ReadDeliveriesByTransporterAndStatus = (transporterId: string, pageNumber: number, status: StatusTypes) => {
  return prisma.deliveries.findMany({
    where: { transporterId, status },
    include: {
      selectedItems: true,
      user: true,
    },
    take: PgConfig.perPage,
    skip: PgConfig.perPage * (pageNumber - 1),
    orderBy: { updated_at: "desc" },
  });
};

export const UpdateDelivery = (body: IRequestDeliveryBody, id: string) => {
  try {
    return prisma.deliveries.update({
      where: { id },
      data: body,
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const DeleteDelivery = (id: string) => {
  try {
    return prisma.deliveries.delete({ where: { id } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
