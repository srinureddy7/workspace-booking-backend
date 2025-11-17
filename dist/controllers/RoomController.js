"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const RoomService_1 = require("../services/RoomService");
const roomService = new RoomService_1.RoomService();
class RoomController {
    static async list(req, res, next) {
        try {
            const rooms = await roomService.listRooms();
            res.json(rooms);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.RoomController = RoomController;
