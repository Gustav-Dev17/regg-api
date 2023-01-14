import { IRequestTransporterBody, ITransporter } from "../types/transporter.body.types";
import { CreateTransportersRepo, ReadTransporters, ReadTransporterByID, UpdateTransporter, DeleteTransporter } from "../repositories/transporters.repository";
import { bucket } from "../firebase/config";
import bcrypt from "bcryptjs";

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

export const ListTransportersService = (pageNumber: number) => {
  try {
    return ReadTransporters(pageNumber as number);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const UpdateTransporterService = async (body: IRequestTransporterBody, id: string, image: string) => {
  try {
    const transporter = await ReadTransporterByID(id);
    const { password } = body;

    body.password = password ? bcrypt.hashSync(password as string, 10) : transporter?.password;

    if (image) {
      if (transporter?.avatar_url) {
        const file = transporter.avatar_url.split("/");
        const deleteFile = file[file.length - 1];

        await bucket.file(deleteFile).delete();
      }
      return UpdateTransporter({ ...body, avatar_url: image }, id);
    }

    return UpdateTransporter({ ...body }, id);
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
