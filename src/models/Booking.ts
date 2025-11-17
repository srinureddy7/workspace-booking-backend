import { Schema, model, Document, Types } from "mongoose";

export type BookingStatus = "CONFIRMED" | "CANCELLED";

export interface IBooking extends Document {
  roomId: Types.ObjectId;
  userName: string;
  startTime: Date;
  endTime: Date;
  totalPrice: number;
  status: BookingStatus;
  createdAt: Date;
  cancelledAt?: Date;
}

const BookingSchema = new Schema<IBooking>({
  roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
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

export const BookingModel = model<IBooking>("Booking", BookingSchema);
