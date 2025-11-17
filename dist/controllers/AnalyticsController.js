"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const AnalyticsService_1 = require("../services/AnalyticsService");
const analyticsService = new AnalyticsService_1.AnalyticsService();
class AnalyticsController {
    static async getAnalytics(req, res, next) {
        try {
            const from = req.query.from;
            const to = req.query.to;
            if (!from || !to) {
                return res
                    .status(400)
                    .json({ error: "from and to query params required (YYYY-MM-DD)" });
            }
            const result = await analyticsService.analytics(from, to);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AnalyticsController = AnalyticsController;
