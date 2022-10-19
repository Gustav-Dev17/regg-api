export type StatusTypes = "Accepted" | "InProgress" | "Selected" | "Refused" | "Waiting" | "Finished" | "Cancelled";

export type ItemsType = {
  id: string;
  image: string;
  quantity: number;
  title: string;
  price: number;
};

export interface IRequestSelectedItemsBody {
  status?: StatusTypes;
  items?: ItemsType[];
  items_amount?: number;
  items_price?: number;
  delivery_price?: number;
  userId?: string;
}

export interface ISelectedItems {
  status: StatusTypes;
  items?: ItemsType[];
  items_amount: number;
  items_price: number;
  delivery_price: number;
  userId: string;
}

export interface ISelectedItemsFields {
  status: StatusTypes;
  items: ItemsType[];
  items_amount: number;
  items_price: number;
  delivery_price: number;
}
