import express from "express";
import { itemSchema } from "schemas/item.schema";
import { validate } from "validators/fields.validator";
import { CreateItem, DeleteItem, ReadItem, ReadAllItems, UpdateItem } from "controllers/items.controller";

const route = express.Router();

//item routes
route.post("/item/create", validate(itemSchema), CreateItem);
route.get("/item/read/:id", ReadItem);
route.get("/item/readAll", ReadAllItems);
route.patch("/item/update/:id", UpdateItem);
route.delete("/item/delete/:id", DeleteItem);

export default route;
