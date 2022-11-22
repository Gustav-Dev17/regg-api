import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { CreateUserService, DeleteUserService, ListUserService, ListUsersService, UpdateUserService } from "../services/users.services";

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const user = await CreateUserService(req.body);
    return res.status(201).json({
      id: user.id,
      user_type: user.user_type,
      name: user.name,
      cpf: user.cpf,
      phone: user.phone,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        if (e.meta?.target === "Users_cpf_key") {
          return res.status(409).json({ message: "O CPF informado já está em uso!" });
        }
        if (e.meta?.target === "Users_phone_key") {
          return res.status(409).json({ message: "O telefone informado já está em uso!" });
        }
        if (e.meta?.target === "Users_email_key") {
          return res.status(409).json({ message: "O e-mail informado já está em uso!" });
        }
      }
    }
    return res.status(400).json({ message: "Erro ao criar a conta do usuário!", descripton: (e as Error).message });
  }
};

export const ReadUser = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const user = await ListUserService(id);
    return res.status(200).json({
      id: user?.id,
      user_type: user?.user_type,
      name: user?.name,
      cpf: user?.cpf,
      phone: user?.phone,
      email: user?.email,
      avatar_image: user?.avatar_image,
      created_at: user?.created_at,
      updated_at: user?.updated_at,
    });
  } catch (e) {
    return res.status(400).json({ message: "Erro ao listar dados do usuário!", descripton: (e as Error).message });
  }
};

export const ReadAllUsers = async (__: Request, res: Response) => {
  try {
    const users = await ListUsersService();
    return res.status(200).json(users);
  } catch (e) {
    return res.status(400).json({ message: "Erro ao listar usuários!", descripton: (e as Error).message });
  }
};

export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const user = await UpdateUserService(req.body, id);
    return res.status(200).json({
      id: user.id,
      user_type: user.user_type,
      name: user.name,
      cpf: user.cpf,
      phone: user.phone,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        if (e.meta?.target === "Users_cpf_key") {
          return res.status(409).json({ message: "O CPF informado já está em uso!" });
        }
        if (e.meta?.target === "Users_phone_key") {
          return res.status(409).json({ message: "O telefone informado já está em uso!" });
        }
        if (e.meta?.target === "Users_email_key") {
          return res.status(409).json({ message: "O e-mail informado já está em uso!" });
        }
      }
      if (e.code === "P2023") {
        return res.status(400).json({ message: "Id malformado!!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }
    }
    return res.status(400).json({ message: "Erro ao atualizar dados do usuário!", descripton: (e as Error).message });
  }
};

export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const user = await DeleteUserService(id);
    return res.status(204).json({ user });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2023") {
        return res.status(400).json({ message: "Id malformado!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }
    }
    return res.status(400).json({ message: "Erro ao deletar a conta do usuário!", descripton: (e as Error).message });
  }
};
