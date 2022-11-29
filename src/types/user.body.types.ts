export interface IRequestUserBody {
  name?: string;
  cpf?: string;
  phone?: string;
  email?: string;
  password?: string;
  reset_token?: string;
  avatar_url?: string;
}

export interface IUser {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
  reset_token?: string;
}

