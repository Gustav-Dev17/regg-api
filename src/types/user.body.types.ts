export interface IRequestUserBody {
  name?: string;
  cpf?: string;
  phone?: string;
  email?: string;
  password?: string;
}

export interface IUser {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
}
