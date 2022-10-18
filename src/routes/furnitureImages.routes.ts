import { Router } from "express";
import { uploadFurnitureImages } from "config/FurnitureImage.config";
import multer from "multer";
import { UploadFurnitureImage, ReadAllFurnitureImage, ReadFurnitureImagesById, ChangeFurnitureImage, DeleteFurnitureImage } from "controllers/furnitureImages.controller";

const furnitureImagesRoutes = Router();

furnitureImagesRoutes.post("/furniture/upload", multer(uploadFurnitureImages.getConfig).single("image_path"), UploadFurnitureImage);
furnitureImagesRoutes.get("/furniture/images", ReadAllFurnitureImage);
furnitureImagesRoutes.get("/furniture/image/:id", ReadFurnitureImagesById);
furnitureImagesRoutes.put("/furniture/update/:id", multer(uploadFurnitureImages.getConfig).single("image_path"), ChangeFurnitureImage);
furnitureImagesRoutes.delete("/furniture/delete/:id", DeleteFurnitureImage);

export default furnitureImagesRoutes;
