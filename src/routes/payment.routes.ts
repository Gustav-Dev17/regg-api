import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { WantPayment, ConfirmPayment } from "../controllers/payments.controller";
import { SimulatePaymentDelivery } from "../controllers/deliveries.controller";

const route = Router();

route.post("/payment", AuthMiddleware, WantPayment);
route.patch("/payment/simulate", AuthMiddleware, SimulatePaymentDelivery);

route.post("/payment/webhook", AuthMiddleware, ConfirmPayment);

export default route;
