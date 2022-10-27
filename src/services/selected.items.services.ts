import { IRequestSelectedItemsBody, ISelectedItems } from "../types/selected.items.body.types";
import {
  CreateSelectedItemsRepo,
  ReadSelectedItemsByUserId,
  ReadSelectedItemsById,
  ReadAllSelectedItems,
  ReadSelectedItemsByUserIdAndStatus,
  UpdateSelectedItems,
  DeleteSelectedItems,
} from "../repositories/selected.items.repository";

export type StatusTypes = "InProgress" | "Finished";

export const CreateSelectedItemsService = (body: ISelectedItems) => {
  try {
    return CreateSelectedItemsRepo(body);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ListSelectedItemsByUserIdService = (id: string) => {
  try {
    return ReadSelectedItemsByUserId(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ListSelectedItemsByIdService = (id: string) => {
  try {
    return ReadSelectedItemsById(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ListAllSelectedItemsService = () => {
  try {
    return ReadAllSelectedItems();
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ListSelectedItemsByUserIdAndStatusService = (id: string, status: StatusTypes) => {
  try {
    return ReadSelectedItemsByUserIdAndStatus(id, status);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const UpdateSelectedItemsService = async (body: IRequestSelectedItemsBody, id: string) => {
  try {
    const item = await ReadSelectedItemsById(id);
    const status = body.status || item?.status;
    const items = body.items || item?.items;
    const items_amount = body.items_amount || item?.items_amount;
    const items_price = body.items_price || item?.items_price;
    const delivery_price = body.delivery_price || item?.delivery_price;
    return UpdateSelectedItems({ status, items, items_amount, items_price, delivery_price }, id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const DeleteSelectedItemsService = (id: string) => {
  try {
    return DeleteSelectedItems(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
