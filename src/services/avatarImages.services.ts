import { IAvatarImages, IRequestAvatarImagesBody } from "../types/avatarImages.body.types";
import {
  CreateAvatarImagesRepo,
  ReadAvatarImagesRepo,
  ReadAvatarImagesByIdRepo,
  ReadAvatarImagesByUserIdRepo,
  UpdateAvatarImageRepo,
  DeleteAvatarImageRepo,
} from "../repositories/avatarImages.repository";
import fs from "fs";

export const UploadAvatarImagesService = async (body: IAvatarImages) => {
  try {
    const userId = await ReadAvatarImagesByUserId(body.userId);
    if (userId) {
      throw new Error("User already have an image");
    }
    return CreateAvatarImagesRepo(body);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadAllAvatarImages = () => {
  try {
    return ReadAvatarImagesRepo();
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadAvatarImagesByUserId = (id: string) => {
  try {
    return ReadAvatarImagesByUserIdRepo(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadAvatarImagesById = (id: string) => {
  try {
    return ReadAvatarImagesByIdRepo(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const UpdateAvatarImage = async (body: IRequestAvatarImagesBody, id: string) => {
  try {
    const image = await ReadAvatarImagesByIdRepo(id);
    if (body.avatar_path) {
      fs.unlinkSync(`${image?.avatar_path.slice(1)}`);
    }

    const avatarPath = `/${body.avatar_path}` || image?.avatar_path;
    const userId = body.userId || image?.userId as string;

    return UpdateAvatarImageRepo({ avatar_path: avatarPath, userId }, id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const DeleteAvatarImages = async (id: string) => {
  try {
    const image = await ReadAvatarImagesByIdRepo(id);
    fs.unlinkSync(`${image?.avatar_path.slice(1)}`);

    return DeleteAvatarImageRepo(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
