import { FindUserOrTransporterByEmail } from "../repositories/auth.google.repository";

export const FindUserOrTransporter = (email: string, userType: string) => {
  try {
    return FindUserOrTransporterByEmail(email, userType);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
