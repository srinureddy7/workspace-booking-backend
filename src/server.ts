import { createApp } from "./app";
import { connectDB } from "./config/db";
import { PORT } from "./config/env";

async function start() {
  await connectDB();
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server", err);
});
