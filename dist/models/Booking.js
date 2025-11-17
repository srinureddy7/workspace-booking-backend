"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    roomId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Room", required: true },
    userName: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ["CONFIRMED", "CANCELLED"],
        default: "CONFIRMED",
    },
    createdAt: { type: Date, default: () => new Date() },
    cancelledAt: { type: Date, required: false },
});
exports.BookingModel = (0, mongoose_1.model)("Booking", BookingSchema);
