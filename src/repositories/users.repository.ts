import prisma from "../services/prisma.services";
import { IUser, IRequestUserBody } from "../types/user.body.types";

export const CreateUsersRepo = (body: IUser) => {
  return prisma.users.create({ data: body });
};

export const ReadUserByID = (id: string) => {
  try {
    return prisma.users.findUnique({
      where: { id },
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadUsers = () => {
  return prisma.users.findMany({
    select: {
      id: true,
      user_type: true,
      name: true,
      cpf: true,
      phone: true,
      email: true,
      created_at: true,
      updated_at: true,
    },
  });
};

export const UpdateUser = (body: IRequestUserBody, id: string) => {
  try {
    return prisma.users.update({
      where: { id },
      data: body,
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const DeleteUser = (id: string) => {
  try {
    return prisma.users.delete({ where: { id } });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ForgotPassword = (id: string, reset_token: string) => {
  try {
    return prisma.users.update({
      where: { id },
      data: { reset_token },
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ResetPassword = (id: string, password: string) => {
  try {
    return prisma.users.update({
      where: { id },
      data: {
        reset_token: "",
        password,
      },
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

