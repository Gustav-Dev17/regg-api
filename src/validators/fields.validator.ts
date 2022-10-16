import { SchemaOf } from "yup";
import { IUser } from "types/user.body.types";
import { ILogin } from "types/login.body.types";
import { Item } from "types/item.body.types";
import { IDelivery } from "types/delivery.body.types";
import { ISelectedItemsFields } from "types/selected.items.body.types";
import { ITransporter } from "types/transporter.body.types";
import { IVehicleFields } from "types/vehicle.body.types";
import { NextFunction, Request, Response } from "express";

export const validate = (schema: SchemaOf<ILogin | IUser | ITransporter | IVehicleFields | Item | ISelectedItemsFields | IDelivery>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      await schema.validate(data, {
        stripUnknown: true,
        abortEarly: false,
      });
      return next();
    } catch (e: any) {
      return res.status(400).json({ error: e.errors });
    }
  };
};
