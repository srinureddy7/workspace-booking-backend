import { IRoom, RoomModel } from "../models/Room";
import { IRoomRepository } from "./IRoomRepository";

export class RoomRepository implements IRoomRepository {
  async findAll(): Promise<IRoom[]> {
    return RoomModel.find().lean();
  }

  async findById(id: string): Promise<IRoom | null> {
    return RoomModel.findById(id);
  }

  async create(room: Partial<IRoom>): Promise<IRoom> {
    return RoomModel.create(room);
  }
}
