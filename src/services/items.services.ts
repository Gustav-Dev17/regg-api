import { IRequestItemBody, Item } from "../types/item.body.types";
import { SearchItems, CreateItemsRepo, ReadItems, ReadItemByID, UpdateItem, DeleteItem } from "../repositories/items.repository";
import { bucket } from "../firebase/config";

export const SearchItemsService = (key: string) => {
  try {
    return SearchItems(key);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const CreateItemService = (body: Item, image: string) => {
  try {
    if (image) {
      return CreateItemsRepo({ ...body, image });
    }
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

export const ListItemsService = (pageNumber: number) => {
  try {
    return ReadItems(pageNumber as number);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const UpdateItemService = async (body: IRequestItemBody, id: string, image: string) => {
  try {
    const item = await ReadItemByID(id);
    if (image) {
      if (item?.image) {
        const file = item.image.split("/");
        const deleteFile = file[file.length - 1];

        await bucket.file(deleteFile).delete();
      }
      return UpdateItem({ ...body, image }, id);
    }
    return UpdateItem({ ...body }, id);
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
