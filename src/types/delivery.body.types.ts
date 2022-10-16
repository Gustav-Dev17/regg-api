export type StatusTypes = "Accepted" | "InProgress" | "Refused" | "Waiting" | "Finished" | "Cancelled";

export interface IRequestDeliveryBody {
  status?: StatusTypes;
  origin?: string;
  origin_desc?: string;
  destine?: string;
  destine_desc?: string;
  userId?: string;
  transporterId?: string;
}

export interface IDelivery {
  status: StatusTypes;
  origin: string;
  origin_desc: string;
  destine: string;
  destine_desc: string;
  userId: string;
  transporterId?: string;
}
