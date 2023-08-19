export type StatusTypes = "Accepted" | "InProgress" | "Selected" | "Refused" | "Waiting" | "Finished" | "Cancelled";

export type VehicleTypes = "Pickup" | "Caminhao_Toco" | "Caminhao_Truck" | "Carreta_5Eixos" | "Carreta_Eixo_Estendido";

export interface IRequestVehicleBody {
  owner_name?: string;
  owner_cpf?: string;
  brand?: string;
  model?: string;
  capacity?: string;
  year?: string;
  color?: string;
  fuel?: string;
  license_plate?: string;
  type?: VehicleTypes;
  renavam?: string;
  chassi?: string;
  transporterId?: string;
}

export interface IVehicle {
  owner_name: string;
  owner_cpf: string;
  brand: string;
  model: string;
  capacity?: string;
  year: string;
  color?: string;
  fuel?: string;
  type?: VehicleTypes;
  license_plate: string;
  renavam: string;
  chassi: string;
  transporterId: string;
}

export interface IVehicleFields {
  owner_name?: string;
  owner_cpf?: string;
  brand: string;
  model: string;
  capacity?: string;
  year: string;
  color?: string;
  fuel?: string;
  license_plate: string;
  type?: VehicleTypes;
  renavam: string;
  chassi?: string;
  transporterId?: string;
}
