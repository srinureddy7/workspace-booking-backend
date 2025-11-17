import { IRoom } from "../models/Room";

export interface IRoomRepository {
  findAll(): Promise<IRoom[]>;
  findById(id: string): Promise<IRoom | null>;
  create(room: Partial<IRoom>): Promise<IRoom>;
}
