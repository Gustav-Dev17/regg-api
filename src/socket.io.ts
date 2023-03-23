import { Express } from "express";
import { io } from "./app";

export class SocketIO {
  static webSocket(app: Express) {
    io.on("connection", (socket) => {
      socket.on("join", ({ deliveryId }) => {
        socket.join(deliveryId);
      });

      socket.on("joinTransporter", ({ userId }) => {
        socket.join(userId);
      });

      socket.on("changeStatusForClient", ({ deliveryId, update }) => {
        io.to(deliveryId).emit("sendToClient", { update });
      });

      socket.on("changeStatusForTransporter", ({ deliveryId, cancel }) => {
        io.to(deliveryId).emit("sendToTransporter", { cancel });
      });

      socket.on("updateSolicitations", ({ userId }) => {
        io.to(userId).emit("sendUpdate");
      });

      socket.on("joinId", (data) => {
        socket.join(data);
      });
    });
  }
}

