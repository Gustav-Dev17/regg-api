import { IRequestVehicleBody, IVehicle } from "types/vehicle.body.types";
import { CreateVehiclesRepo, ReadVehicles, ReadVehicleByID, ReadVehicleByUser, UpdateVehicle, DeleteVehicle } from "repositories/vehicles.repository";

export const CreateVehicleService = (body: IVehicle) => {
  try {
    return CreateVehiclesRepo(body);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ListVehicleService = (id: string) => {
  try {
    return ReadVehicleByID(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ListVehiclesService = () => {
  try {
    return ReadVehicles();
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ListVehicleByUserService = (id: string) => {
  try {
    return ReadVehicleByUser(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const UpdateVehicleService = async (body: IRequestVehicleBody, id: string) => {
  try {
    const vehicle = await ReadVehicleByID(id);
    const brand = body.brand || vehicle?.brand;
    const model = body.model || vehicle?.model;
    const capacity = body.capacity || (vehicle?.capacity as string);
    const year = body.year || vehicle?.year;
    const color = body.color || (vehicle?.color as string);
    const fuel = body.fuel || (vehicle?.fuel as string);
    const license_plate = body.license_plate || vehicle?.license_plate;
    const renavam = body.renavam || vehicle?.renavam;
    const chassi = body.chassi || vehicle?.chassi;
    return UpdateVehicle({ brand, model, capacity, year, color, fuel, license_plate, renavam, chassi }, id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const DeleteVehicleService = (id: string) => {
  try {
    return DeleteVehicle(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
