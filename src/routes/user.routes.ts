import express from "express";
import { loginSchema } from "schemas/login.schema";
import { DoLogin } from "controllers/auth.user.controller";
import { userSchema } from "schemas/user.schema";
import { selectedItemsSchema } from "schemas/selected.items.schema";
import { validate } from "validators/fields.validator";
import { AuthMiddleware } from "middlewares/auth.middleware";
import { CreateUser, DeleteUser, ReadUser, ReadAllUsers, UpdateUser } from "controllers/users.controller";
import {
  CreateSelectedItems,
  ReadSelectedItemsById,
  ReadSelectedItemsByUserId,
  ReadAllSelectedItems,
  UpdateSelectedItems,
  DeleteSelectedItems,
} from "controllers/selected.items.controller";

const route = express.Router();

route.post("/user/login", validate(loginSchema), DoLogin);

//user routes
route.post("/user", validate(userSchema), CreateUser);
route.get("/user", AuthMiddleware, ReadUser);
route.get("/users", AuthMiddleware, ReadAllUsers);
route.patch("/user", validate(userSchema), AuthMiddleware, UpdateUser);
route.delete("/user", AuthMiddleware, DeleteUser);

//user's package of items
route.post("/selectedItems/create", validate(selectedItemsSchema), CreateSelectedItems);
route.get("/selectedItems/read", AuthMiddleware, ReadSelectedItemsByUserId);
route.get("/selectedItems/readAll", AuthMiddleware, ReadAllSelectedItems);
route.get("/selectedItems/find/:id", AuthMiddleware, ReadSelectedItemsById);
route.patch("/selectedItems/update/:id", validate(selectedItemsSchema), AuthMiddleware, UpdateSelectedItems);
route.delete("/selectedItems/delete/:id", AuthMiddleware, DeleteSelectedItems);
export default route;
