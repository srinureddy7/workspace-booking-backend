"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingRoutes_1 = __importDefault(require("./bookingRoutes"));
const roomRoutes_1 = __importDefault(require("./roomRoutes"));
const analyticsRoutes_1 = __importDefault(require("./analyticsRoutes"));
const router = (0, express_1.Router)();
router.use("/rooms", roomRoutes_1.default);
router.use("/bookings", bookingRoutes_1.default);
router.use("/analytics", analyticsRoutes_1.default);
exports.default = router;
