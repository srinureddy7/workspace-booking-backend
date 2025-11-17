import { IRoomRepository } from "../repositories/IRoomRepository";
import { RoomRepository } from "../repositories/RoomRepository";

export class RoomService {
  constructor(private roomRepo: IRoomRepository = new RoomRepository()) {}

  async listRooms() {
    return this.roomRepo.findAll();
  }

  async getRoomById(id: string) {
    return this.roomRepo.findById(id);
  }
}
