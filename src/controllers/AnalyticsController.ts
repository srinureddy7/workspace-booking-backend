import { Request, Response, NextFunction } from "express";
import { AnalyticsService } from "../services/AnalyticsService";

const analyticsService = new AnalyticsService();

export class AnalyticsController {
  static async getAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const from = req.query.from as string;
      const to = req.query.to as string;

      if (!from || !to) {
        return res
          .status(400)
          .json({ error: "from and to query params required (YYYY-MM-DD)" });
      }

      const result = await analyticsService.analytics(from, to);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
