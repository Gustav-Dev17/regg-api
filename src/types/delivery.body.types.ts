export type Status = "Accepted" | "InProgress" | "Refused" | "Waiting" | "Finished";

export interface IRequestDeliveryBody {
  status?: Status;
  origin?: string;
  origin_desc?: string;
  destine?: string;
  destine_desc?: string;
  userId?: string;
  transporterId?: string;
}

export interface IDelivery {
  status: Status;
  origin: string;
  origin_desc: string;
  destine: string;
  destine_desc: string;
  userId: string;
  transporterId?: string;
}
