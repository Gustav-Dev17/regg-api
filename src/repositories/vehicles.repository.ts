import prisma from "../services/prisma.services";
import { IVehicle, IRequestVehicleBody } from "../types/vehicle.body.types";

export const CreateVehiclesRepo = (body: IVehicle) => {
  return prisma.vehicles.create({ data: body });
};

export const ReadVehicleByID = (id: string) => {
  try {
    return prisma.vehicles.findUnique({ where: { id } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadVehicles = () => {
  return prisma.vehicles.findMany();
};

export const ReadVehicleByUser = (transporterId: string) => {
  return prisma.vehicles.findUnique({ where: { transporterId } });
};

export const UpdateVehicle = (body: IRequestVehicleBody, id: string) => {
  try {
    return prisma.vehicles.update({
      where: { id },
      data: body,
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const DeleteVehicle = (id: string) => {
  try {
    return prisma.vehicles.delete({ where: { id } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
