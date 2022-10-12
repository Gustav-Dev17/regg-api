export type Status = "Accepted" | "InProgress" | "Refused" | "Waiting" | "Finished";

export interface IRequestSelectedItemBody {
  status?: Status;
  items_amount?: number;
  items_price?: number;
  delivery_price?: number;
  userId?: string;
  deliveryId?: string;
}

export interface ISelectedItem {
  status: Status;
  items_amount: number;
  items_price: number;
  delivery_price: number;
  userId: string;
  deliveryId: string;
}
