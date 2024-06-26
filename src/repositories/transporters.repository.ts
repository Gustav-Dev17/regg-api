import prisma from "../services/prisma.services";
import { PgConfig } from "../config/pagination.config";
import { ITransporter, IRequestTransporterBody } from "../types/transporter.body.types";

export const CreateTransportersRepo = (body: ITransporter) => {
  return prisma.transporters.create({ data: body });
};

export const ReadTransporterByID = (id: string) => {
  return prisma.transporters.findUnique({
    where: { id },
    include: { vehicle: true },
  });
};

export const ReadTransporters = async (pageNumber: number) => {
  const totalCount = await prisma.transporters.aggregate({
    _count: true,
    where: {
      vehicle: {
        active: true,
      },
    },
  });

  const totalPage = Math.ceil((totalCount._count as number) / PgConfig.perPage);

  const transporters = await prisma.transporters.findMany({
    where: {
      vehicle: {
        active: true,
      },
    },
    select: {
      id: true,
      user_type: true,
      name: true,
      cpf: true,
      phone: true,
      email: true,
      license_category: true,
      transport_license: true,
      created_at: true,
      updated_at: true,
      vehicle: true,
      avatar_url: true,
    },
    take: PgConfig.perPage,
    skip: PgConfig.perPage * (pageNumber - 1),
  });

  return {
    totalCount: totalCount._count,
    totalPage,
    currentPage: pageNumber,
    transporters,
  };
};

export const UpdateTransporter = (body: IRequestTransporterBody, id: string) => {
  return prisma.transporters.update({
    where: { id },
    data: body,
  });
};

export const DeleteTransporter = (id: string) => {
  return prisma.transporters.delete({ where: { id } });
};
