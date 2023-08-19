import prisma from "../services/prisma.services";
import { PgConfig } from "../config/pagination.config";
import { IDelivery, IRequestDeliveryBody } from "../types/delivery.body.types";
import { StatusTypes } from "../types/delivery.body.types";

export const PossibleStatus = "Accepted" || "Cancelled" || "InProgress " || "Refused" || "Waiting";

export const CreateDeliveriesRepo = (body: IDelivery) => {
  return prisma.deliveries.create({ data: body });
};

export const CheckExistingAwaitingDeliveries = (userId: string, status: StatusTypes) => {
  return prisma.deliveries.findMany({
    where: { userId, status },
  });
};

export const ReadDeliveryByID = (id: string) => {
  return prisma.deliveries.findUnique({
    where: { id },
    include: {
      selectedItems: true,
      user: true,
      transporter: {
        include: {
          vehicle: true,
        },
      },
    },
  });
};

export const ReadDeliveries = async (pageNumber: number) => {
  const totalCount = await prisma.deliveries.aggregate({
    _count: true,
  });

  const totalPage = Math.ceil((totalCount._count as number) / PgConfig.perPage);

  const deliveries = await prisma.deliveries.findMany({
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

  return {
    totalCount: totalCount._count,
    totalPage,
    currentPage: pageNumber,
    deliveries,
  };
};

export const ReadDeliveriesByUser = async (userId: string, pageNumber: number) => {
  const totalCount = await prisma.deliveries.aggregate({
    where: {
      AND: [{ userId: userId }],
      NOT: {
        status: "Finished",
      },
    },
    _count: true,
  });

  const totalPage = Math.ceil((totalCount._count as number) / PgConfig.perPage);

  const deliveries = await prisma.deliveries.findMany({
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

  return {
    totalCount: totalCount._count,
    totalPage,
    currentPage: pageNumber,
    deliveries,
  };
};

export const ReadDeliveriesByUserAndStatus = async (userId: string, pageNumber: number, status: StatusTypes) => {
  const totalCount = await prisma.deliveries.aggregate({
    where: { userId, status },
    _count: true,
  });

  const totalPage = Math.ceil((totalCount._count as number) / PgConfig.perPage);

  const deliveries = await prisma.deliveries.findMany({
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

  return {
    totalCount: totalCount._count,
    totalPage,
    currentPage: pageNumber,
    deliveries,
  };
};

export const ReadDeliveryToPay = async (transporterId: string) => {
  return prisma.deliveries.findFirst({
    where: {
      transporterId: transporterId,
      status: {
        not: "Waiting",
      },
      isPaid: false,
    },
    include: {
      selectedItems: true,
    },
  });
};

export const ReadDeliveriesByTransporter = async (transporterId: string, pageNumber: number) => {
  const totalCount = await prisma.deliveries.aggregate({
    where: {
      AND: [{ transporterId: transporterId }],
      NOT: {
        status: "Finished",
      },
    },
    _count: true,
  });

  const totalPage = Math.ceil((totalCount._count as number) / PgConfig.perPage);

  const deliveries = await prisma.deliveries.findMany({
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
    orderBy: { updated_at: "asc" },
  });

  return {
    totalCount: totalCount._count,
    totalPage,
    currentPage: pageNumber,
    deliveries,
  };
};

export const ReadDeliveriesByTransporterAndStatus = async (transporterId: string, pageNumber: number, status: StatusTypes) => {
  const totalCount = await prisma.deliveries.aggregate({
    where: { transporterId, status },
    _count: true,
  });

  const totalPage = Math.ceil((totalCount._count as number) / PgConfig.perPage);

  const deliveries = await prisma.deliveries.findMany({
    where: { transporterId, status },
    include: {
      selectedItems: true,
      user: true,
    },
    take: PgConfig.perPage,
    skip: PgConfig.perPage * (pageNumber - 1),
    orderBy: { updated_at: "desc" },
  });

  return {
    totalCount: totalCount._count,
    totalPage,
    currentPage: pageNumber,
    deliveries,
  };
};

export const UpdateDelivery = (body: IRequestDeliveryBody, id: string) => {
  return prisma.deliveries.update({
    where: { id },
    data: body,
  });
};

export const DeleteDelivery = (id: string) => {
  return prisma.deliveries.delete({ where: { id } });
};
