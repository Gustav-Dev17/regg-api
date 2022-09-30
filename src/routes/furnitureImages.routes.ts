import { Router } from "express";
import { uploadFurnitureImages } from "config/FurnitureImage.config";
import multer from "multer";
import { UploadFurnitureImage } from "controllers/furnitureImages.controller";

const furnitureImagesRoutes = Router();

furnitureImagesRoutes.post("/furniture/upload", multer(uploadFurnitureImages.getConfig).single("image_path"), UploadFurnitureImage);

export default furnitureImagesRoutes;
