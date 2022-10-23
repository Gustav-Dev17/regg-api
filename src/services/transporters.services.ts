import bcrypt from "bcryptjs";
import { IRequestTransporterBody, ITransporter } from "../types/transporter.body.types";
import { CreateTransportersRepo, ReadTransporters, ReadTransporterByID, UpdateTransporter, DeleteTransporter } from "../repositories/transporters.repository";

export const CreateTransporterService = (body: ITransporter) => {
  try {
    body.password = bcrypt.hashSync(body.password, 8);
    return CreateTransportersRepo(body);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ListTransporterService = (id: string) => {
  try {
    return ReadTransporterByID(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ListTransportersService = (pageNumber?: number) => {
  try {
    return ReadTransporters(pageNumber as number);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const UpdateTransporterService = async (body: IRequestTransporterBody, id: string) => {
  try {
    const transporter = await ReadTransporterByID(id);
    const name = body.name || transporter?.name;
    const cpf = body.cpf || transporter?.cpf;
    const phone = body.phone || transporter?.phone;
    const email = body.email || transporter?.email;
    const license_category = body.license_category || transporter?.license_category;
    const transport_license = body.transport_license || transporter?.transport_license;
    const decryptedPassword = body.password || transporter?.password;

    const password = bcrypt.hashSync(decryptedPassword as string, 8);

    return UpdateTransporter({ name, cpf, phone, email, license_category, transport_license, password }, id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const DeleteTransporterService = (id: string) => {
  try {
    return DeleteTransporter(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
