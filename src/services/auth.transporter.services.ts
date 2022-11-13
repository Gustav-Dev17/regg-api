import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../services/prisma.services";
import { authConf } from "../config/auth.config";

export const LoginService = async (email: string, password: string) => {
  try {
    const transporter = await prisma.transporters.findFirstOrThrow({ where: { email } });
    if (!transporter) {
      throw new Error("Transporter does not exist!");
    }
    const matchPassword = await bcrypt.compare(password, transporter.password);
    if (!matchPassword) {
      throw new Error("Invalid credentials!");
    }
    const token = jwt.sign(
      {
        transporterId: transporter.id,
        transporterName: transporter.name,
        transporterCPF: transporter.cpf,
        userType: transporter.user_type,
      },
      authConf.secret as string,
    );

    return token;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
