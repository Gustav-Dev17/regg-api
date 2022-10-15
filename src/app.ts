import cors from "cors";
import express from "express";
import userRoutes from "routes/user.routes";
import transporterRoutes from "routes/transporter.routes";
import furnitureImagesRoutes from "routes/furnitureImages.routes";
import avatarImagesRoutes from "routes/avatarImages.routes";

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
app.use(transporterRoutes);
app.use(furnitureImagesRoutes);
app.use(avatarImagesRoutes);

app.get("/", (__, res) => {
  res.send("Back-end is running...");
});

export { app };
