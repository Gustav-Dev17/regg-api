import prisma from "services/prisma.services";
import { ITransporter, IRequestTransporterBody } from "types/transporter.body.types";

export const CreateTransportersRepo = (body: ITransporter) => {
  return prisma.transporters.create({ data: body });
};

export const ReadTransporterByID = (id: string) => {
  try {
    return prisma.transporters.findUnique({ where: { id } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadTransporters = () => {
  return prisma.transporters.findMany();
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