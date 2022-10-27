import bcrypt from "bcryptjs";
import { IRequestUserBody, IUser } from "../types/user.body.types";
import { CreateUsersRepo, ReadUsers, ReadUserByID, UpdateUser, DeleteUser, ForgotPassword, ResetPassword } from "../repositories/users.repository";
import { sign } from "jsonwebtoken";
import { authConf } from "config/auth.config";

export const CreateUserService = (body: IUser) => {
  try {
    body.password = bcrypt.hashSync(body.password, 8);
    return CreateUsersRepo(body);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ListUserService = (id: string) => {
  try {
    return ReadUserByID(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ListUsersService = () => {
  try {
    return ReadUsers();
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const UpdateUserService = async (body: IRequestUserBody, id: string) => {
  try {
    const user = await ReadUserByID(id);
    const name = body.name || user?.name;
    const cpf = body.cpf || user?.cpf;
    const phone = body.phone || user?.phone;
    const email = body.email || user?.email;

    const decryptedPassword = body.password || user?.password;

    const password = bcrypt.hashSync(decryptedPassword as string, 8);

    return UpdateUser({ name, cpf, phone, email, password }, id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const DeleteUserService = (id: string) => {
  try {
    return DeleteUser(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ForgotUserPassword = async (id: string) => {
  try {
    const user = await ReadUserByID(id);
    const resetToken = sign({ userId: user?.id }, authConf.secret);
    return ForgotPassword(id, resetToken);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ResetUserPassword = async (id: string, password: string) => {
  try {
    const user = await ReadUserByID(id);
    const newPass = password || user?.password;
    const passHash = bcrypt.hashSync(newPass as string, 8);

    return ResetPassword(id, passHash);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
