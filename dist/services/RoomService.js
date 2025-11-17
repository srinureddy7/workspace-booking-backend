"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const RoomRepository_1 = require("../repositories/RoomRepository");
class RoomService {
    constructor(roomRepo = new RoomRepository_1.RoomRepository()) {
        this.roomRepo = roomRepo;
    }
    async listRooms() {
        return this.roomRepo.findAll();
    }
    async getRoomById(id) {
        return this.roomRepo.findById(id);
    }
}
exports.RoomService = RoomService;
