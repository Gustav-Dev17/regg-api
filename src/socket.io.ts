import { Express } from "express";
import { io } from "./app";

export class SocketIO {
  static webSocket(app: Express) {
    io.on("connection", (socket) => {
      socket.on("join", ({ deliveryId, userId }) => {
        socket.join(deliveryId);
        if (userId) {
          socket.join(userId);
        }
      });

      socket.on("changeStatusForClient", ({ deliveryId }) => {
        io.to(deliveryId).emit("sendToClient", { update: true });
      });

      socket.on("changeStatusForTransporter", ({ deliveryId, cancel }) => {
        io.to(deliveryId).emit("sendToTransporter", { cancel });
      });

      socket.on("updateSolicitations", ({ userId }) => {
        io.to(userId).emit("sendUpdate");
      });
    });
  }
}

