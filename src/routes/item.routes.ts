import { Router } from "express";
import { itemSchema } from "../schemas/item.schema";
import { validate } from "../validators/fields.validator";
import { SearchItems, CreateItem, DeleteItem, ReadItem, ReadAllItems, UpdateItem } from "../controllers/items.controller";
import { multerUpload } from "../config/multer";
import { UploadMiddleware } from "../middlewares/upload.middleware";

const route = Router();

//item routes
route.get("/item/find", SearchItems);
route.post("/item/create", validate(itemSchema), multerUpload.single("img"), UploadMiddleware, CreateItem);
route.get("/item/read/:id", ReadItem);
route.get("/item/readAll", ReadAllItems);
route.patch("/item/update/:id", multerUpload.single("img"), UploadMiddleware, UpdateItem);
route.delete("/item/delete/:id", DeleteItem);

export default route;
