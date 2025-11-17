import { Request, Response, NextFunction } from "express";
import { RoomService } from "../services/RoomService";

const roomService = new RoomService();

export class RoomController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const rooms = await roomService.listRooms();
      res.json(rooms);
    } catch (err) {
      next(err);
    }
  }
}
