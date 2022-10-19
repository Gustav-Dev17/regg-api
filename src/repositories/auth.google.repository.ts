import prisma from "services/prisma.services";

export const FindUserOrTransporterByEmail = (email: string, userType: string) => {
  try {
    if (userType === "client") {
      return prisma.users.findUnique({ where: { email } });
    }
    if (userType === "transporter") {
      return prisma.transporters.findUnique({ where: { email } });
    }
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
