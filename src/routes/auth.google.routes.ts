import express from "express";
import { CheckEmail } from "controllers/auth.google.controller";

const route = express.Router();

route.get("/login/google/", CheckEmail); //types client or transporter

export default route;
