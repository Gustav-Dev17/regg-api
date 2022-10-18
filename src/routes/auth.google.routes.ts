import express from "express";
import { authGoogleSchema } from "schemas/auth.google.schema";
import { validate } from "validators/fields.validator";
import { CheckEmail } from "controllers/auth.google.controller";

const route = express.Router();

route.post("/login/google/:userType", validate(authGoogleSchema), CheckEmail); //types User or Transporter

export default route;
