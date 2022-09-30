export interface IRequestVehicleBody {
  owner_name?: string;
  owner_cpf_cnpj?: string;
  brand?: string;
  model?: string;
  capacity?: string;
  year?: string;
  color?: string;
  fuel?: string;
  license_plate?: string;
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
  renavam: string;
  chassi: string;
  transporterId?: string;
}
