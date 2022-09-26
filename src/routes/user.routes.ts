import express from "express";
import { loginSchema } from "schemas/login.schema";
import { DoLogin } from "controllers/auth.user.controller";
import { userSchema } from "schemas/user.schema";
import { validate } from "validators/fields.validator";
import { AuthMiddleware } from "middlewares/auth.middleware";
import { CreateUser, DeleteUser, ReadUser, ReadAllUsers, UpdateUser } from "controllers/users.controller";

const route = express.Router();

route.post("/user/login", validate(loginSchema), DoLogin);

//user routes
route.post("/user", validate(userSchema), CreateUser);
route.get("/user", AuthMiddleware, ReadUser);
route.get("/users", AuthMiddleware, ReadAllUsers);
route.patch("/user", validate(userSchema), AuthMiddleware, UpdateUser);
route.delete("/user", AuthMiddleware, DeleteUser);

export default route;
