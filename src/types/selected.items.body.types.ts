export type StatusTypes = "Accepted" | "InProgress" | "Refused" | "Waiting" | "Finished";

export interface IRequestSelectedItemsBody {
  status?: StatusTypes;
  items_amount?: number;
  items_price?: number;
  delivery_price?: number;
  userId?: string;
  deliveryId?: string;
}

export interface ISelectedItems {
  status: StatusTypes;
  items_amount: number;
  items_price: number;
  delivery_price: number;
  userId: string;
  deliveryId?: string;
}

export interface ISelectedItemsFields {
  status: StatusTypes;
  items_amount: number;
  items_price: number;
  delivery_price: number;
}