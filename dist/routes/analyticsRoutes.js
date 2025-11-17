"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AnalyticsController_1 = require("../controllers/AnalyticsController");
const router = (0, express_1.Router)();
router.get("/", AnalyticsController_1.AnalyticsController.getAnalytics);
exports.default = router;
