import { IBooking } from "../models/Booking";

export interface IBookingRepository {
  create(booking: Partial<IBooking>): Promise<IBooking>;
  findById(id: string): Promise<IBooking | null>;
  findConflicting(roomId: string, start: Date, end: Date): Promise<IBooking[]>;
  markCancelled(id: string): Promise<void>;
  findConfirmedBetween(
    roomId: string,
    from: Date,
    to: Date
  ): Promise<IBooking[]>;
  findAll(): Promise<IBooking[]>;
}
