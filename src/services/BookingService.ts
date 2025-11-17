import { IBookingRepository } from "../repositories/IBookingRepository";
import { BookingRepository } from "../repositories/BookingRepository";
import { IRoomRepository } from "../repositories/IRoomRepository";
import { RoomRepository } from "../repositories/RoomRepository";
import { CreateBookingDto } from "../dtos/CreateBookingDto";
import { ApiError } from "../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import dayjs from "dayjs";
import { computeTotalPrice } from "../utils/pricing";

export class BookingService {
  constructor(
    private bookingRepo: IBookingRepository = new BookingRepository(),
    private roomRepo: IRoomRepository = new RoomRepository()
  ) {}

  private validateTimes(start: dayjs.Dayjs, end: dayjs.Dayjs) {
    if (!start.isBefore(end)) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "startTime must be before endTime"
      );
    }
    const durationMinutes = end.diff(start, "minute");
    if (durationMinutes > 12 * 60) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Booking duration cannot exceed 12 hours"
      );
    }
  }

  async createBooking(dto: CreateBookingDto) {
    const room = await this.roomRepo.findById(dto.roomId);
    if (!room) throw new ApiError(StatusCodes.NOT_FOUND, "Room not found");

    const start = dayjs(dto.startTime);
    const end = dayjs(dto.endTime);
    this.validateTimes(start, end);

    // check for conflicts
    const conflicts = await this.bookingRepo.findConflicting(
      dto.roomId,
      start.toDate(),
      end.toDate()
    );
    if (conflicts.length > 0) {
      // return first conflict range
      const c = conflicts[0];
      const from = dayjs(c.startTime).format("YYYY-MM-DDTHH:mm");
      const to = dayjs(c.endTime).format("YYYY-MM-DDTHH:mm");
      throw new ApiError(
        StatusCodes.CONFLICT,
        `Room already booked from ${from} to ${to}`
      );
    }

    // compute price prorated by minute
    const totalPrice = computeTotalPrice(
      start.toISOString(),
      end.toISOString(),
      room.baseHourlyRate
    );

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

  async cancelBooking(id: string) {
    const booking = await this.bookingRepo.findById(id);
    if (!booking)
      throw new ApiError(StatusCodes.NOT_FOUND, "Booking not found");
    if (booking.status === "CANCELLED")
      throw new ApiError(StatusCodes.BAD_REQUEST, "Booking already cancelled");

    const now = dayjs();
    const start = dayjs(booking.startTime);
    const diffMinutes = start.diff(now, "minute");

    if (diffMinutes <= 120) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Cancellations allowed only more than 2 hours before startTime"
      );
    }

    await this.bookingRepo.markCancelled(id);
  }

  async listAllBookings() {
    return this.bookingRepo.findAll();
  }
}
