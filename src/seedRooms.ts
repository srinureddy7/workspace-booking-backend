import { connectDB } from "./config/db";
import { RoomModel } from "./models/Room";

async function seed() {
  await connectDB();
  const existing = await RoomModel.countDocuments();
  if (existing > 0) {
    console.log("Rooms already seeded");
    process.exit(0);
  }

  const rooms = [
    { name: "Cabin 1", baseHourlyRate: 300, capacity: 4 },
    { name: "Cabin 2", baseHourlyRate: 500, capacity: 8 },
    { name: "Conference Hall", baseHourlyRate: 1000, capacity: 20 },
  ];

  await RoomModel.insertMany(rooms);
  console.log("Seeded rooms");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
