import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../services/prisma.services";
import { authConf } from "../config/auth.config";

export const LoginService = async (email: string, password: string) => {
  try {
    const user = await prisma.users.findFirstOrThrow({ where: { email } });
    if (!user) {
      throw new Error("Usuário não encontrado!");
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw new Error("Credenciais inválidas!");
    }
    const token = jwt.sign({ userId: user.id, userType: user.user_type }, authConf.secret as string);

    return token;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
