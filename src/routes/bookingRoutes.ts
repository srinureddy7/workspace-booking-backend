import { Router } from "express";
import { BookingController } from "../controllers/BookingController";
const router = Router();

router.post("/", BookingController.create);
router.post("/:id/cancel", BookingController.cancel);
router.get("/", BookingController.listAll);

export default router;
