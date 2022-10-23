import prisma from "../services/prisma.services";
import { PgConfig } from "../config/pagination.config";
import { ITransporter, IRequestTransporterBody } from "../types/transporter.body.types";

export const CreateTransportersRepo = (body: ITransporter) => {
  return prisma.transporters.create({ data: body });
};

export const ReadTransporterByID = (id: string) => {
  try {
    return prisma.transporters.findUnique({
      where: { id },
      include: {
        avatar_image: true,
        vehicle: true,
        deliveries: true,
      },
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadTransporters = (pageNumber?: number) => {
  if (pageNumber) {
    return prisma.transporters.findMany({
      select: {
        id: true,
        user_type: true,
        name: true,
        cpf: true,
        phone: true,
        email: true,
        license_category: true,
        transport_license: true,
        avatar_image: true,
        vehicle: true,
        deliveries: true
      },
      take: PgConfig.perPage,
      skip: PgConfig.perPage * (pageNumber - 1),
    });
  } else {
    return prisma.transporters.findMany({
      select: {
        id: true,
        user_type: true,
        name: true,
        cpf: true,
        phone: true,
        email: true,
        license_category: true,
        transport_license: true,
      },
    });
  }
};

export const UpdateTransporter = (body: IRequestTransporterBody, id: string) => {
  try {
    return prisma.transporters.update({
      where: { id },
      data: body,
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const DeleteTransporter = (id: string) => {
  try {
    return prisma.transporters.delete({ where: { id } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
