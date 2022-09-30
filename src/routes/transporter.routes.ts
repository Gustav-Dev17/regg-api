import express from "express";
import { loginSchema } from "schemas/login.schema";
import { vehicleSchema } from "schemas/vehicle.schema";
import { DoLogin } from "controllers/auth.transporter.controller";
import { transporterSchema } from "schemas/transporter.schema";
import { validate } from "validators/fields.validator";
import { AuthMiddleware } from "middlewares/auth.middleware";
import { CreateTransporter, DeleteTransporter, ReadTransporter, ReadAllTransporters, UpdateTransporter } from "controllers/transporters.controller";
import { CreateVehicle, DeleteVehicle, ReadVehicle, ReadVehicleByTransporter, ReadAllVehicles, UpdateVehicle } from "controllers/vehicles.controller";

const route = express.Router();

route.post("/transporter/login", validate(loginSchema), DoLogin);

//transporter routes
route.post("/transporter", validate(transporterSchema), CreateTransporter);
route.get("/transporter", AuthMiddleware, ReadTransporter);
route.get("/transporters", AuthMiddleware, ReadAllTransporters);
route.patch("/transporter", validate(transporterSchema), AuthMiddleware, UpdateTransporter);
route.delete("/transporter", AuthMiddleware, DeleteTransporter);

//transporter routes
route.post("/vehicle", validate(vehicleSchema), AuthMiddleware, CreateVehicle);
route.get("/vehicle/:id", AuthMiddleware, AuthMiddleware, ReadVehicle);
route.get("/vehicles", AuthMiddleware, ReadAllVehicles);
route.get("/transporter/vehicle", AuthMiddleware, AuthMiddleware, ReadVehicleByTransporter);
route.patch("/vehicle/:id", validate(vehicleSchema), AuthMiddleware, UpdateVehicle);
route.delete("/vehicle/:id", AuthMiddleware, DeleteVehicle);

export default route;
