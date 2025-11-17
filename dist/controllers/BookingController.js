"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const BookingService_1 = require("../services/BookingService");
const bookingService = new BookingService_1.BookingService();
class BookingController {
    static async create(req, res, next) {
        try {
            const payload = req.body;
            const result = await bookingService.createBooking(payload);
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    static async cancel(req, res, next) {
        try {
            const id = req.params.id;
            await bookingService.cancelBooking(id);
            res.json({ message: "Booking cancelled" });
        }
        catch (err) {
            next(err);
        }
    }
    static async listAll(req, res, next) {
        try {
            const list = await bookingService.listAllBookings();
            res.json(list);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.BookingController = BookingController;
