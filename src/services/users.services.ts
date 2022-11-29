import { IRequestUserBody, IUser } from "../types/user.body.types";
import { CreateUsersRepo, ReadUsers, ReadUserByID, UpdateUser, DeleteUser, ForgotPassword, ResetPassword } from "../repositories/users.repository";
import { sign } from "jsonwebtoken";
import { authConf } from "../config/auth.config";
import { bucket } from "../firebase/config";
import bcrypt from "bcryptjs";

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

export const UpdateUserService = async (body: IRequestUserBody, id: string, image: string) => {
  try {
    const user = await ReadUserByID(id);

    const { password } = body;

    body.password = password ? bcrypt.hashSync(password as string, 10) : user?.password;

    if (image) {
      if (user?.avatar_url) {
        const file = user.avatar_url.split("/");
        const deleteFile = file[file.length - 1];

        await bucket.file(deleteFile).delete();
      }
      return UpdateUser({ ...body, avatar_url: image }, id);
    }

    return UpdateUser({ ...body }, id);
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

