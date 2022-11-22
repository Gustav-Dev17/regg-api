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

export type StatusTypes = "InProgress" | "Finished" | "Selected";

export const CreateSelectedItemsService = async (body: ISelectedItems) => {
  try {
    const existingSelected = await ReadSelectedItemsByUserIdAndStatus(body.userId);
    if (existingSelected) {
      throw new Error("Já existem itens selecionados!");
    }
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

export const ListSelectedItemsByUserIdAndStatusService = (id: string) => {
  try {
    return ReadSelectedItemsByUserIdAndStatus(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const UpdateSelectedItemsService = async (body: IRequestSelectedItemsBody, id: string) => {
  try {
//    const item = await ReadSelectedItemsById(id);
//     const status = body.status || item?.status;
//     const items = body.items || item?.items;
//     const items_amount = (body.items_amount as number) || (item?.items_amount as number);
//     const items_price = (body.items_price as number) || (item?.items_price as number);
//     const delivery_price = (body.delivery_price as number) || (item?.delivery_price as number);
    return UpdateSelectedItems(body, id);
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
