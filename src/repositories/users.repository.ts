import prisma from "../services/prisma.services";
import { IUser, IRequestUserBody } from "../types/user.body.types";

export const CreateUsersRepo = (body: IUser) => {
  return prisma.users.create({ data: body });
};

export const ReadUserByID = (id: string) => {
  return prisma.users.findUnique({
    where: { id },
  });
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
  return prisma.users.update({
    where: { id },
    data: body,
  });
};

export const DeleteUser = (id: string) => {
  return prisma.users.delete({ where: { id } });
};

export const ForgotPassword = (id: string, reset_token: string) => {
  return prisma.users.update({
    where: { id },
    data: { reset_token },
  });
};

export const ResetPassword = (id: string, password: string) => {
  return prisma.users.update({
    where: { id },
    data: {
      reset_token: "",
      password,
    },
  });
};
