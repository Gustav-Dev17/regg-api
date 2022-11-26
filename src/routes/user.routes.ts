import { Router } from "express";
import { loginSchema } from "../schemas/login.schema";
import { DoLogin } from "../controllers/auth.user.controller";
import { userSchema } from "../schemas/user.schema";
import { selectedItemsSchema } from "../schemas/selected.items.schema";
import { validate } from "../validators/fields.validator";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CreateUser, DeleteUser, ReadUser, ReadAllUsers, UpdateUser } from "../controllers/users.controller";
import {
  CreateSelectedItems,
  ReadSelectedItemsById,
  ReadSelectedItemsByUserId,
  ReadAllSelectedItems,
  ReadSelectedItemsByUserIdAndStatus,
  UpdateSelectedItems,
  DeleteSelectedItems,
} from "../controllers/selected.items.controller";
import { multerUpload } from "../config/multer";
import { UploadMiddleware } from "../middlewares/upload.middleware";

const route = Router();

route.post("/user/login", validate(loginSchema), DoLogin);

//user routes
route.post("/user", validate(userSchema), CreateUser);
route.get("/user", AuthMiddleware, ReadUser);
route.get("/users", AuthMiddleware, ReadAllUsers);
route.patch("/user", AuthMiddleware, multerUpload.single("img"), UploadMiddleware, UpdateUser);
route.delete("/user", AuthMiddleware, DeleteUser);

//user's package of items
route.post("/selectedItems/create", validate(selectedItemsSchema), AuthMiddleware, CreateSelectedItems);
route.get("/selectedItems/find/:id", AuthMiddleware, ReadSelectedItemsById);
route.get("/selectedItems/read", AuthMiddleware, ReadSelectedItemsByUserId);
route.get("/selectedItems/readAll", AuthMiddleware, ReadAllSelectedItems);
route.get("/selectedItems/readBy", AuthMiddleware, ReadSelectedItemsByUserIdAndStatus); //query example: ?status=2
route.patch("/selectedItems/update/:id", AuthMiddleware, UpdateSelectedItems);
route.delete("/selectedItems/delete/:id", AuthMiddleware, DeleteSelectedItems);

export default route;

