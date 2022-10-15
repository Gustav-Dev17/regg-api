import { Router } from "express";
import multer from "multer";
import { uploadAvatarImages } from "config/AvatarImages.config";
import {
  UploadAvatarImagesController,
  ReadAllAvatarImagesController,
  ReadAvatarImagesByIdController,
  ReadAvatarImagesByUserIdController,
  UpdateAvatarImageController,
  DeleteAvatarImagesController,
} from "controllers/avatarImages.controller";

const avatarImagesRoutes = Router();

avatarImagesRoutes.post("/avatar/upload", multer(uploadAvatarImages.getConfig).single("avatar_path"), UploadAvatarImagesController);
avatarImagesRoutes.get("/avatar/images", ReadAllAvatarImagesController);
avatarImagesRoutes.get("/avatar/image/:id", ReadAvatarImagesByIdController);
avatarImagesRoutes.get("/avatar/userimage/:id", ReadAvatarImagesByUserIdController);
avatarImagesRoutes.put("/avatar/update/:id", multer(uploadAvatarImages.getConfig).single("avatar_path"), UpdateAvatarImageController);
avatarImagesRoutes.delete("/avatar/delete/:id", DeleteAvatarImagesController);

export default avatarImagesRoutes;
