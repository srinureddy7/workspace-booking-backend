import { BookingRepository } from "../repositories/BookingRepository";
import { RoomRepository } from "../repositories/RoomRepository";
import dayjs from "dayjs";

export class AnalyticsService {
  private bookingRepo = new BookingRepository();
  private roomRepo = new RoomRepository();

  /**
   * from/to are ISO date strings (YYYY-MM-DD). We compute totals using confirmed bookings.
   */
  async analytics(fromISO: string, toISO: string) {
    const from = dayjs(fromISO).startOf("day").toDate();
    const to = dayjs(toISO).endOf("day").toDate();

    const rooms = await this.roomRepo.findAll();

    const results = await Promise.all(
      rooms.map(async (room) => {
        const bookings = await this.bookingRepo.findConfirmedBetween(
          room._id.toString(),
          from,
          to
        );
        let totalHours = 0;
        let totalRevenue = 0;
        for (const b of bookings) {
          const start = dayjs(b.startTime);
          const end = dayjs(b.endTime);
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
      })
    );

    return results;
  }
}
