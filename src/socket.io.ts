import { Express } from "express";
import { io } from "./app";

export class SocketIO {
  static webSocket(app: Express) {
    io.on("connection", (socket) => {
      socket.on("join", ({ deliveryId }) => {
        socket.join(deliveryId);
      });

      socket.on("changeStatusForClient", ({ deliveryId }) => {
        io.to(deliveryId).emit("sendToClient", { update: true });
      });
    });
  }
}

