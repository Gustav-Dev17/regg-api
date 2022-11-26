declare namespace Express {
  export interface Request {
    id: string;
    userType: string;
    transporterName?: string;
    transporterCPF?: string;
    firebaseUrl: string;
  }
}

