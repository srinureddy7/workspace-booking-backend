"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const BookingRepository_1 = require("../repositories/BookingRepository");
const RoomRepository_1 = require("../repositories/RoomRepository");
const dayjs_1 = __importDefault(require("dayjs"));
class AnalyticsService {
    constructor() {
        this.bookingRepo = new BookingRepository_1.BookingRepository();
        this.roomRepo = new RoomRepository_1.RoomRepository();
    }
    /**
     * from/to are ISO date strings (YYYY-MM-DD). We compute totals using confirmed bookings.
     */
    async analytics(fromISO, toISO) {
        const from = (0, dayjs_1.default)(fromISO).startOf("day").toDate();
        const to = (0, dayjs_1.default)(toISO).endOf("day").toDate();
        const rooms = await this.roomRepo.findAll();
        const results = await Promise.all(rooms.map(async (room) => {
            const bookings = await this.bookingRepo.findConfirmedBetween(room._id.toString(), from, to);
            let totalHours = 0;
            let totalRevenue = 0;
            for (const b of bookings) {
                const start = (0, dayjs_1.default)(b.startTime);
                const end = (0, dayjs_1.default)(b.endTime);
                const durationHours = end.diff(start, "minute") / 60;
                totalHours += durationHours;
                totalRevenue += b.totalPrice;
            }
            return {
                roomId: room._id,
                roomName: room.name,
                totalHours: Math.round(totalHours * 100) / 100,
                totalRevenue: Math.round(totalRevenue * 100) / 100,
            };
        }));
        return results;
    }
}
exports.AnalyticsService = AnalyticsService;
