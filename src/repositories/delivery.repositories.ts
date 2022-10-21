import prisma from "../services/prisma.services";
import { PgConfig } from "../config/pagination.config";
import { IDelivery, IRequestDeliveryBody } from "../types/delivery.body.types";
import { StatusTypes } from "../types/delivery.body.types";

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
  if (pageNumber) {
    return prisma.deliveries.findMany({
      take: PgConfig.perPage,
      skip: PgConfig.perPage * pageNumber,
    });
  } else {
    return prisma.deliveries.findMany();
  }
};

export const ReadDeliveriesByUser = (userId: string, pageNumber: number) => {
  if (pageNumber) {
    return prisma.deliveries.findMany({
      take: PgConfig.perPage,
      skip: PgConfig.perPage * pageNumber,
      where: { AND: [{ userId: userId }, { status: "Accepted" || "Cancelled" || "InProgress " || "Refused" || "Waiting" }] },
      orderBy: { updated_at: "desc" },
    });
  } else {
    return prisma.deliveries.findMany({
      where: { AND: [{ userId: userId }, { status: "Accepted" || "Cancelled" || "InProgress " || "Refused" || "Waiting" }] },
      orderBy: { updated_at: "desc" },
    });
  }
};

export const ReadDeliveriesByUserAndStatus = (userId: string, pageNumber: number, status: StatusTypes) => {
  if (pageNumber) {
    return prisma.deliveries.findMany({
      take: PgConfig.perPage,
      skip: PgConfig.perPage * pageNumber,
      where: { userId, status },
      orderBy: { updated_at: "desc" },
    });
  } else {
    return prisma.deliveries.findMany({
      where: { userId, status },
      orderBy: { updated_at: "desc" },
    });
  }
};

export const ReadDeliveriesByTransporter = (transporterId: string, pageNumber: number) => {
  if (pageNumber) {
    return prisma.deliveries.findMany({
      take: PgConfig.perPage,
      skip: PgConfig.perPage * pageNumber,
      where: { AND: [{ transporterId: transporterId }, { status: "Accepted" || "Cancelled" || "InProgress " || "Refused" || "Waiting" }] },
      orderBy: { updated_at: "desc" },
    });
  } else {
    return prisma.deliveries.findMany({
      where: { AND: [{ transporterId: transporterId }, { status: "Accepted" || "Cancelled" || "InProgress " || "Refused" || "Waiting" }] },
      orderBy: { updated_at: "desc" },
    });
  }
};

export const ReadDeliveriesByTransporterAndStatus = (transporterId: string, pageNumber: number, status: StatusTypes) => {
  if (pageNumber) {
    return prisma.deliveries.findMany({
      take: PgConfig.perPage,
      skip: PgConfig.perPage * pageNumber,
      where: { transporterId, status },
      orderBy: { updated_at: "desc" },
    });
  } else {
    return prisma.deliveries.findMany({
      where: { transporterId, status },
      orderBy: { updated_at: "desc" },
    });
  }
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
