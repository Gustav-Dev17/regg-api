import cors from "cors";
import express from "express";
import itemRoutes from "routes/item.routes"
import userRoutes from "routes/user.routes";
import transporterRoutes from "routes/transporter.routes";
import furnitureImagesRoutes from "routes/furnitureImages.routes";

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
app.use(itemRoutes);
app.use(userRoutes);
app.use(transporterRoutes);
app.use(furnitureImagesRoutes);

app.get("/", (__, res) => {
  res.send("Back-end is running...");
});

export { app };
