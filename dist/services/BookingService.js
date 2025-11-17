"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const BookingRepository_1 = require("../repositories/BookingRepository");
const RoomRepository_1 = require("../repositories/RoomRepository");
const ApiError_1 = require("../errors/ApiError");
const http_status_codes_1 = require("http-status-codes");
const dayjs_1 = __importDefault(require("dayjs"));
const pricing_1 = require("../utils/pricing");
class BookingService {
    constructor(bookingRepo = new BookingRepository_1.BookingRepository(), roomRepo = new RoomRepository_1.RoomRepository()) {
        this.bookingRepo = bookingRepo;
        this.roomRepo = roomRepo;
    }
    validateTimes(start, end) {
        if (!start.isBefore(end)) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "startTime must be before endTime");
        }
        const durationMinutes = end.diff(start, "minute");
        if (durationMinutes > 12 * 60) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Booking duration cannot exceed 12 hours");
        }
    }
    async createBooking(dto) {
        const room = await this.roomRepo.findById(dto.roomId);
        if (!room)
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "Room not found");
        const start = (0, dayjs_1.default)(dto.startTime);
        const end = (0, dayjs_1.default)(dto.endTime);
        this.validateTimes(start, end);
        // check for conflicts
        const conflicts = await this.bookingRepo.findConflicting(dto.roomId, start.toDate(), end.toDate());
        if (conflicts.length > 0) {
            // return first conflict range
            const c = conflicts[0];
            const from = (0, dayjs_1.default)(c.startTime).format("YYYY-MM-DDTHH:mm");
            const to = (0, dayjs_1.default)(c.endTime).format("YYYY-MM-DDTHH:mm");
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.CONFLICT, `Room already booked from ${from} to ${to}`);
        }
        // compute price prorated by minute
        const totalPrice = (0, pricing_1.computeTotalPrice)(start.toISOString(), end.toISOString(), room.baseHourlyRate);
        // create booking
        const created = await this.bookingRepo.create({
            roomId: room._id,
            userName: dto.userName,
            startTime: start.toDate(),
            endTime: end.toDate(),
            totalPrice,
            status: "CONFIRMED",
        });
        return {
            bookingId: created._id,
            roomId: dto.roomId,
            userName: dto.userName,
            totalPrice,
            status: "CONFIRMED",
        };
    }
    async cancelBooking(id) {
        const booking = await this.bookingRepo.findById(id);
        if (!booking)
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "Booking not found");
        if (booking.status === "CANCELLED")
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Booking already cancelled");
        const now = (0, dayjs_1.default)();
        const start = (0, dayjs_1.default)(booking.startTime);
        const diffMinutes = start.diff(now, "minute");
        if (diffMinutes <= 120) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Cancellations allowed only more than 2 hours before startTime");
        }
        await this.bookingRepo.markCancelled(id);
    }
    async listAllBookings() {
        return this.bookingRepo.findAll();
    }
}
exports.BookingService = BookingService;
