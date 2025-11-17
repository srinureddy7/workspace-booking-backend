"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRepository = void 0;
const Room_1 = require("../models/Room");
class RoomRepository {
    async findAll() {
        return Room_1.RoomModel.find().lean();
    }
    async findById(id) {
        return Room_1.RoomModel.findById(id);
    }
    async create(room) {
        return Room_1.RoomModel.create(room);
    }
}
exports.RoomRepository = RoomRepository;
