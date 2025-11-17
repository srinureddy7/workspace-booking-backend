"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModel = void 0;
const mongoose_1 = require("mongoose");
const RoomSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    baseHourlyRate: { type: Number, required: true },
    capacity: { type: Number, required: true },
});
exports.RoomModel = (0, mongoose_1.model)("Room", RoomSchema);
