import { Router } from "express";
import bookingRoutes from "./bookingRoutes";
import roomRoutes from "./roomRoutes";
import analyticsRoutes from "./analyticsRoutes";

const router = Router();

router.use("/rooms", roomRoutes);
router.use("/bookings", bookingRoutes);
router.use("/analytics", analyticsRoutes);

export default router;
