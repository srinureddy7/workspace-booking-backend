import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./errors/errorHandler";
import bodyParser from "body-parser";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/api", routes);
  app.use(errorHandler);
  return app;
}
