import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { FindUserOrTransporter } from "services/auth.google.services";

export type UserTypes = "User" | "Transporter";

export const CheckEmail = async (req: Request, res: Response) => {
  try {
    const userOrTransporter = await FindUserOrTransporter(req.query.email as string, req.query.type as string);

    if (userOrTransporter) {
      return res.status(200).json(userOrTransporter);
    } else {
      return res.status(404).json({ message: "User or client does not exist!" });
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res.status(404).json({ message: "User or client does not exist!" });
      }
    }
    return res.status(400).json({ message: "Error when looking for user or client!", descripton: (e as Error).message });
  }
};
