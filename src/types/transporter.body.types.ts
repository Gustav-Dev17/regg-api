export interface IRequestTransporterBody {
  name?: string;
  cpf?: string;
  phone?: string;
  email?: string;
  password?: string;
  license_category?: string;
  transport_license?: boolean;
  avatar_url?: string;
}

export interface ITransporter {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
  license_category: string;
  transport_license: boolean;
}

