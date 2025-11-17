import { Router } from "express";
import { RoomController } from "../controllers/RoomController";
const router = Router();

router.get("/", RoomController.list);

export default router;
