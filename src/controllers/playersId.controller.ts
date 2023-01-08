import { Request, Response } from "express";
import {
  AddPlayerIdToUserService,
  AddPlayerIdToTransporterService,
  ListPlayersIdsFromTransporterService,
  ListPlayersIdsFromUserService,
  RemovePlayerIdFromTransporterService,
  RemovePlayerIdFromUserService,
} from "../services/playersId.services";

export const AddPlayerIdToUser = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    if (!req.body.id) {
      return res.status(400).json({ message: "Id required" });
    }
    const playerId = await AddPlayerIdToUserService(id, req.body.id);
    return res.status(200).json({
      message: playerId,
    });
  } catch (e) {
    return res.status(400).json({ message: (e as Error).message });
  }
};

export const AddPlayerIdToTransporter = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    if (!req.body.id) {
      return res.status(400).json({ message: "Id required" });
    }
    const playerId = await AddPlayerIdToTransporterService(id, req.body.id);
    return res.status(200).json({
      message: playerId,
    });
  } catch (e) {
    return res.status(400).json({ message: (e as Error).message });
  }
};

export const RemovePlayerIdFromUser = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const playerId = await RemovePlayerIdFromUserService(id, req.params.id);
    return res.status(204).json({
      message: playerId,
    });
  } catch (e) {
    return res.status(400).json({ message: (e as Error).message });
  }
};

export const RemovePlayerIdFromTransporter = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const playerId = await RemovePlayerIdFromTransporterService(id, req.params.id);
    return res.status(204).json({
      message: playerId,
    });
  } catch (e) {
    return res.status(400).json({ message: (e as Error).message });
  }
};

export const ListPlayersIdsFromUser = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const players = await ListPlayersIdsFromUserService(id);
    return res.status(200).json(players);
  } catch (e) {
    return res.status(400).json({ message: (e as Error).message });
  }
};

export const ListPlayersIdsFromTransporter = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const players = await ListPlayersIdsFromTransporterService(id);
    return res.status(200).json(players);
  } catch (e) {
    return res.status(400).json({ message: (e as Error).message });
  }
};

