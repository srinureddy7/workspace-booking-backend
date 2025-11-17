import { BookingModel, IBooking } from "../models/Booking";
import { IBookingRepository } from "./IBookingRepository";
import { Types } from "mongoose";

export class BookingRepository implements IBookingRepository {
  async create(booking: Partial<IBooking>): Promise<IBooking> {
    return BookingModel.create(booking);
  }

  async findById(id: string): Promise<IBooking | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return BookingModel.findById(id);
  }

  async findConflicting(
    roomId: string,
    start: Date,
    end: Date
  ): Promise<IBooking[]> {
    // overlap condition: existing.start < new.end && existing.end > new.start
    return BookingModel.find({
      roomId,
      status: "CONFIRMED",
      startTime: { $lt: end },
      endTime: { $gt: start },
    }).exec();
  }

  async markCancelled(id: string): Promise<void> {
    await BookingModel.findByIdAndUpdate(id, {
      status: "CANCELLED",
      cancelledAt: new Date(),
    });
  }

  async findConfirmedBetween(
    roomId: string,
    from: Date,
    to: Date
  ): Promise<IBooking[]> {
    return BookingModel.find({
      roomId,
      status: "CONFIRMED",
      startTime: { $lt: to },
      endTime: { $gt: from },
    }).exec();
  }

  async findAll(): Promise<IBooking[]> {
    return BookingModel.find().exec();
  }
}
