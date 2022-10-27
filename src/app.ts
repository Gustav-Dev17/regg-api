import cors from "cors";
import express from "express";
import itemRoutes from "./routes/item.routes";
import userRoutes from "./routes/user.routes";
import transporterRoutes from "./routes/transporter.routes";
import furnitureImagesRoutes from "./routes/furnitureImages.routes";
import avatarImagesRoutes from "./routes/avatarImages.routes";
import deliveryRoutes from "./routes/delivery.routes";
import googleAuth from "./routes/auth.google.routes";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);
app.use(express.json());
app.use("/furniture-images", express.static("furniture-images"));
app.use("/avatar-images", express.static("avatar-images"));
app.use(userRoutes);
app.use(itemRoutes);
app.use(transporterRoutes);
app.use(furnitureImagesRoutes);
app.use(avatarImagesRoutes);
app.use(deliveryRoutes);
app.use(googleAuth);

app.get("/", (__, res) => {
  res.send("Back-end is running...");
});

export { app };
