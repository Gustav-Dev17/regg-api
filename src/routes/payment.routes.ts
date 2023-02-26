import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { WantPayment } from "../controllers/payments.controller";
import { SimulatePaymentDelivery } from "../controllers/deliveries.controller";

const route = Router();

route.post("/payment", AuthMiddleware, WantPayment);
route.patch("/payment/simulate", AuthMiddleware, SimulatePaymentDelivery);

route.post("/payment/webhook", AuthMiddleware, (req, res) => {
  const { id } = req;
  if (id !== null && id !== "63fbd8fa3c2607578c917d78") throw "Invalid user";

  return res.status(200).json("Hello, world!");
});

export default route;
