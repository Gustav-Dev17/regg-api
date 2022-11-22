import { verify } from "jsonwebtoken";
import { authConf } from "../config/auth.config";
import { Request, Response, NextFunction } from "express";

interface TokenPayload {
  userId?: string;
  userType: string;
  transporterId?: string;
  transporterName?: string;
  transporterCPF?: string;
  email: string;
}

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Não autorizado!" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = verify(token, authConf.secret) as TokenPayload;
    if (decoded.userId) {
      req.id = decoded.userId;
      req.userType = decoded.userType;
    }
    if (decoded.transporterId) {
      req.id = decoded.transporterId;
      req.userType = decoded.userType;
      req.transporterName = decoded.transporterName;
      req.transporterCPF = decoded.transporterCPF;
    }

    return next();
  } catch {
    return res.status(400).json({ message: "Token inválido!" });
  }
};
