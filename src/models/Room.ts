import { Schema, model, Document } from "mongoose";

export interface IRoom extends Document {
  name: string;
  baseHourlyRate: number; // in currency units per hour
  capacity: number;
}

const RoomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  baseHourlyRate: { type: Number, required: true },
  capacity: { type: Number, required: true },
});

export const RoomModel = model<IRoom>("Room", RoomSchema);
