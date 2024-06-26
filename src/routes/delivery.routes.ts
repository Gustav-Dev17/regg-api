import { Router } from "express";
import { validate } from "../validators/fields.validator";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { deliverySchema } from "../schemas/delivery.schema";

import {
  CreateDelivery,
  ReadDelivery,
  ReadAllDeliveries,
  ReadDeliveriesByUser,
  ReadDeliveriesByUserAndStatus,
  ReadDeliveryToBePaid,
  ReadDeliveriesByTransporter,
  ReadDeliveriesByTransporterAndStatus,
  UpdateDelivery,
  DeleteDelivery,
  UpdateTransporterInDelivery,
} from "../controllers/deliveries.controller";

const route = Router();

//user's deliveries
route.post("/delivery", validate(deliverySchema), AuthMiddleware, CreateDelivery);

route.get("/delivery/:id", AuthMiddleware, ReadDelivery);
route.get("/deliveries", AuthMiddleware, ReadAllDeliveries);
route.get("/deliveriesByUser", AuthMiddleware, ReadDeliveriesByUser); //?page=
route.get("/deliveriesByUserAndStatus", AuthMiddleware, ReadDeliveriesByUserAndStatus); //?page= and ?status=

route.get("/deliveryToBePaid", AuthMiddleware, ReadDeliveryToBePaid);
route.get("/deliveriesByTransporter", AuthMiddleware, ReadDeliveriesByTransporter); //?page=
route.get("/deliveriesByTransporterAndStatus", AuthMiddleware, ReadDeliveriesByTransporterAndStatus); //?page= and ?status=
route.patch("/delivery/:id", AuthMiddleware, UpdateDelivery);
route.patch("/transporterInDelivery/:id", AuthMiddleware, UpdateTransporterInDelivery);
route.delete("/delivery/:id", AuthMiddleware, DeleteDelivery);

export default route;
