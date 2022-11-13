import { Router } from "express";
import { loginSchema } from "../schemas/login.schema";
import { vehicleSchema } from "../schemas/vehicle.schema";
import { DoLogin } from "../controllers/auth.transporter.controller";
import { transporterSchema } from "../schemas/transporter.schema";
import { validate } from "../validators/fields.validator";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CreateTransporter, DeleteTransporter, ReadTransporter, ReadTransporterWithId, ReadAllTransporters, UpdateTransporter } from "../controllers/transporters.controller";
import { CreateVehicle, DeleteVehicle, ReadVehicle, ReadVehicleByTransporter, ReadAllVehicles, UpdateVehicle } from "../controllers/vehicles.controller";

const route = Router();

route.post("/transporter/login", validate(loginSchema), DoLogin);

//transporter routes
route.post("/transporter", validate(transporterSchema), CreateTransporter);
route.get("/transporter", AuthMiddleware, ReadTransporter);
route.get("/transporter/:id", AuthMiddleware, ReadTransporterWithId);
route.get("/transporters", ReadAllTransporters); //query example to paginate: ?page=2
route.patch("/transporter", AuthMiddleware, UpdateTransporter);
route.delete("/transporter", AuthMiddleware, DeleteTransporter);

//transporter routes
route.post("/vehicle", validate(vehicleSchema), AuthMiddleware, CreateVehicle);
route.get("/vehicle/:id", AuthMiddleware, AuthMiddleware, ReadVehicle);
route.get("/vehicles", AuthMiddleware, ReadAllVehicles);
route.get("/transporter/vehicle", AuthMiddleware, AuthMiddleware, ReadVehicleByTransporter);
route.patch("/vehicle/:id", AuthMiddleware, UpdateVehicle);
route.delete("/vehicle/:id", AuthMiddleware, DeleteVehicle);

export default route;
