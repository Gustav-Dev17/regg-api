declare namespace Express {
  export interface Request {
    id: string;
    transporterName?: string;
    transporterCPF?: string;
  }
}
