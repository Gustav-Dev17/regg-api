import cors from "cors";
import express from "express";
import userRoutes from "routes/user.routes";
import transporterRoutes from "routes/transporter.routes";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);
app.use(express.json());

app.use(userRoutes);
app.use(transporterRoutes);

app.get("/", (__, res) => {
  res.send("Back-end is running...");
});

export { app };
