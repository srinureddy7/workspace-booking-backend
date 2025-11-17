"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BookingController_1 = require("../controllers/BookingController");
const router = (0, express_1.Router)();
router.post("/", BookingController_1.BookingController.create);
router.post("/:id/cancel", BookingController_1.BookingController.cancel);
router.get("/", BookingController_1.BookingController.listAll);
exports.default = router;
