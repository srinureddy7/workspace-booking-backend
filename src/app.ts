import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./errors/errorHandler";
import bodyParser from "body-parser";

export function createApp() {
  const app = express();
  app.use(
    cors({
      origin: [
        "http://localhost:5173", // local dev
        "https://your-frontend.netlify.app", // replace with your deployed frontend URL
        "https://your-frontend.vercel.app",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.use(bodyParser.json());
  app.use("/api", routes);
  app.use(errorHandler);
  return app;
}
