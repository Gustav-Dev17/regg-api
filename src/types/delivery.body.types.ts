export type StatusTypes = "Accepted" | "InProgress" | "Selected" | "Refused" | "Waiting" | "Finished" | "Cancelled";

export interface IRequestDeliveryBody {
  status?: StatusTypes;
  origin?: string;
  origin_desc?: string;
  destine?: string;
  destine_desc?: string;
  distance?: string;
  isPaid?: boolean;
  paymentId?: string;
  userId?: string;
  transporterId?: string | null;
  selectedItemsId?: string;
}

export interface IDelivery {
  status: StatusTypes;
  origin: string;
  origin_desc: string;
  destine: string;
  destine_desc: string;
  distance: string;
  isPaid: boolean;
  paymentId?: string;
  userId: string;
  transporterId: string;
  selectedItemsId: string;
}

export interface IDeliveryFields {
  status: StatusTypes;
  origin: string;
  origin_desc: string;
  destine: string;
  destine_desc: string;
  distance: string;
  isPaid?: boolean;
  paymentId?: string;
  userId?: string;
  transporterId: string;
  selectedItemsId: string;
}
