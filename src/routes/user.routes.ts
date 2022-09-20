import express from "express";
import { userSchema } from "schemas/user.schema";
import { transporterSchema } from "schemas/transporter.schema";
import { loginSchema } from "schemas/login.schema";
import { DoLogin } from "controllers/auth.controller";
import { validate } from "validators/fields.validator";
import { AuthMiddleware } from "middlewares/auth.middleware";
import { CreateUser, DeleteUser, ReadUser, ReadAllUsers, UpdateUser } from "controllers/users.controller";
import { CreateTransporter, DeleteTransporter, ReadTransporter, ReadAllTransporters, UpdateTransporter } from "controllers/transporters.controller";

const route = express.Router();

route.post("/login", validate(loginSchema), DoLogin);

//user routes
route.post("/user", validate(userSchema), CreateUser);
route.get("/user", AuthMiddleware, ReadUser);
route.get("/users", AuthMiddleware, ReadAllUsers);
route.patch("/user", validate(userSchema), AuthMiddleware, UpdateUser);
route.delete("/user", AuthMiddleware, DeleteUser);

//transporter routes
route.post("/transporter", validate(transporterSchema), CreateTransporter);
route.get("/transporter", AuthMiddleware, ReadTransporter);
route.get("/transporters", AuthMiddleware, ReadAllTransporters);
route.patch("/transporter", validate(transporterSchema), AuthMiddleware, UpdateTransporter);
route.delete("/transporter", AuthMiddleware, DeleteTransporter);

export default route;
