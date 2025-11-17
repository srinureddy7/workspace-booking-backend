"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const Booking_1 = require("../models/Booking");
const mongoose_1 = require("mongoose");
class BookingRepository {
    async create(booking) {
        return Booking_1.BookingModel.create(booking);
    }
    async findById(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id))
            return null;
        return Booking_1.BookingModel.findById(id);
    }
    async findConflicting(roomId, start, end) {
        // overlap condition: existing.start < new.end && existing.end > new.start
        return Booking_1.BookingModel.find({
            roomId,
            status: "CONFIRMED",
            startTime: { $lt: end },
            endTime: { $gt: start },
        }).exec();
    }
    async markCancelled(id) {
        await Booking_1.BookingModel.findByIdAndUpdate(id, {
            status: "CANCELLED",
            cancelledAt: new Date(),
        });
    }
    async findConfirmedBetween(roomId, from, to) {
        return Booking_1.BookingModel.find({
            roomId,
            status: "CONFIRMED",
            startTime: { $lt: to },
            endTime: { $gt: from },
        }).exec();
    }
    async findAll() {
        return Booking_1.BookingModel.find().exec();
    }
}
exports.BookingRepository = BookingRepository;
