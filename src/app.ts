import cors from "cors";
import express from "express";
import itemRoutes from "./routes/item.routes";
import userRoutes from "./routes/user.routes";
import transporterRoutes from "./routes/transporter.routes";
import deliveryRoutes from "./routes/delivery.routes";
import paymentRoutes from "./routes/payment.routes";
import googleAuth from "./routes/auth.google.routes";
import http from "http";
import { Server } from "socket.io";
import { SocketIO } from "./socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running");
});

app.post("/webhook", (req, res) => {
  res.send("Hello, world!");
});

app.use(userRoutes);
app.use(itemRoutes);
app.use(transporterRoutes);
app.use(deliveryRoutes);
app.use(paymentRoutes);
app.use(googleAuth);

SocketIO.webSocket(app);

export { app, server, io };
