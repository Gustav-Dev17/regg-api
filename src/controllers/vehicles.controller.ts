import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { CreateVehicleService, ListVehicleService, ListVehiclesService, ListVehicleByUserService, UpdateVehicleService, DeleteVehicleService } from "../services/vehicles.services";

export const CreateVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const { transporterName } = req;
    const { transporterCPF } = req;

    req.body.transporterId = id;
    req.body.owner_name = transporterName;
    req.body.owner_cpf = transporterCPF;

    const newVehicle = await CreateVehicleService(req.body);
    return res.status(201).json(newVehicle);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        if (e.meta?.target === "Vehicles_license_plate_key") {
          return res.status(409).json({ message: "Essa placa já está em uso por outro veículo!" });
        }
        if (e.meta?.target === "Vehicles_renavam_key") {
          return res.status(409).json({ message: "Esse renavam já está em uso por outro veículo!" });
        }
        if (e.meta?.target === "Vehicles_chassi_key") {
          return res.status(409).json({ message: "Esse Chassi já está em uso por outro veículo!" });
        }
      }
    }
    return res.status(400).json({ message: "Erro ao adicionar o veículo!", descripton: (e as Error).message });
  }
};

export const ReadVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await ListVehicleService(req.params.id);
    return res.status(200).json(vehicle);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Veículo não encontrado!" });
      }
    }
    return res.status(400).json({ message: "Erro ao listar dados do veículo!", descripton: (e as Error).message });
  }
};

export const ReadAllVehicles = async (_req: Request, res: Response) => {
  try {
    const vehicles = await ListVehiclesService();
    return res.status(200).json(vehicles);
  } catch (e) {
    return res.status(400).json({ message: "Erro ao listar veículos!", descripton: (e as Error).message });
  }
};

export const ReadVehicleByTransporter = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    // req.body.userId = id;
    const vehicles = await ListVehicleByUserService(id);
    return res.status(200).json(vehicles);
  } catch (e) {
    return res.status(400).json({ message: "Erro ao listar o veículo!", descripton: (e as Error).message });
  }
};

export const UpdateVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await UpdateVehicleService(req.body, req.params.id);
    return res.status(200).json(vehicle);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        if (e.meta?.target === "Vehicles_license_plate_key") {
          return res.status(409).json({ message: "Essa placa já está em uso por outro veículo!" });
        }
        if (e.meta?.target === "Vehicles_renavam_key") {
          return res.status(409).json({ message: "Esse renavam já está em uso por outro veículo!" });
        }
        if (e.meta?.target === "Vehicles_chassi_key") {
          return res.status(409).json({ message: "Esse Chassi já está em uso por outro veículo!" });
        }
      }
      if (e.code === "P2023") {
        return res.status(400).json({ message: "Id malformado!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Veículo não encontrado!" });
      }
    }
    return res.status(400).json({ message: "Erro ao atualizar dados do veículo!", descripton: (e as Error).message });
  }
};

export const DeleteVehicle = async (req: Request, res: Response) => {
  try {
    await DeleteVehicleService(req.params.id);
    return res.status(204).json();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2023") {
        return res.status(400).json({ message: "Id malformado!!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Veículo não encontrado!" });
      }
    }
    return res.status(400).json({ message: "Erro ao deletar o veículo!", descripton: (e as Error).message });
  }
};
