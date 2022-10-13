import { IRequestItemBody, Item } from "types/item.body.types";
import { CreateItemsRepo, ReadItems, ReadItemByID, UpdateItem, DeleteItem } from "repositories/items.repository";

export const CreateItemService = (body: Item) => {
  try {
    return CreateItemsRepo(body);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ListItemService = (id: string) => {
  try {
    return ReadItemByID(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ListItemsService = () => {
  try {
    return ReadItems();
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const UpdateItemService = async (body: IRequestItemBody, id: string) => {
  try {
    const item = await ReadItemByID(id);
    const name = body.name || item?.name;
    const price = body.price || item?.price;
    return UpdateItem({ name, price }, id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const DeleteItemService = (id: string) => {
  try {
    return DeleteItem(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
