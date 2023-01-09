import prisma from "../services/prisma.services";

export const AddPlayerIdToUserService = async (userId: string, id: string) => {
  const playerIdExists = await prisma.playersId.findFirst({ where: { userId } });

  if (!playerIdExists) {
    await prisma.playersId.create({ data: { ids: [id], userId } });
    return `${id} added`;
  }

  const playersIdsAlreadyAdded = await prisma.playersId.findFirst({ where: { userId } });

  if (!playersIdsAlreadyAdded) {
    throw new Error("Player id not found");
  }

  if (playersIdsAlreadyAdded.ids.includes(id)) {
    return "Id exists in list";
  }

  await prisma.playersId.update({ where: { id: playersIdsAlreadyAdded.id }, data: { ids: [...playersIdsAlreadyAdded.ids, id] } });

  return "Updated list";
};

export const AddPlayerIdToTransporterService = async (transporterId: string, id: string) => {
  const playerIdExists = await prisma.playersId.findFirst({ where: { transporterId } });

  if (!playerIdExists) {
    await prisma.playersId.create({ data: { ids: [id], transporterId } });
    return `${id} added`;
  }

  const playersIdsAlreadyAdded = await prisma.playersId.findFirst({ where: { transporterId } });

  if (!playersIdsAlreadyAdded) {
    throw new Error("Player id not found");
  }

  if (playersIdsAlreadyAdded.ids.includes(id)) {
    throw new Error("Id exists in list");
  }

  await prisma.playersId.update({ where: { id: playersIdsAlreadyAdded.id }, data: { ids: [...playersIdsAlreadyAdded.ids, id] } });

  return "Updated list";
};

export const RemovePlayerIdFromUserService = async (userId: string, id: string) => {
  const playerIdExists = await prisma.playersId.findFirst({ where: { userId } });

  if (!playerIdExists) {
    throw new Error("Player id not found");
  }

  const removeId = playerIdExists.ids.filter((item) => item !== id);

  await prisma.playersId.update({ where: { id: playerIdExists.id }, data: { ids: removeId } });

  return `${id} removed`;
};

export const RemovePlayerIdFromTransporterService = async (transporterId: string, id: string) => {
  const playerIdExists = await prisma.playersId.findFirst({ where: { transporterId } });

  if (!playerIdExists) {
    throw new Error("Player id not found");
  }

  const removeId = playerIdExists.ids.filter((item) => item !== id);

  await prisma.playersId.update({ where: { id: playerIdExists.id }, data: { ids: removeId } });

  return `${id} removed`;
};

export const ListPlayersIdsFromUserService = async (userId: string) => {
  return prisma.playersId.findMany({ where: { userId } });
};

export const ListPlayersIdsFromTransporterService = async (transporterId: string) => {
  return prisma.playersId.findMany({ where: { transporterId } });
};

