import prisma from "services/prisma.services";

export const FindUserOrTransporterByEmail = (email: string, userType: string) => {
  try {
    console.log(email);
    if (userType === "User") {
      return prisma.users.findUnique({ where: { email } });
    }
    if (userType === "Transporter") {
      return prisma.transporters.findUnique({ where: { email } });
    }
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
