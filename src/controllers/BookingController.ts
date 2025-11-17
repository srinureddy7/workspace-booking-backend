import { Request, Response, NextFunction } from "express";
import { BookingService } from "../services/BookingService";

const bookingService = new BookingService();

export class BookingController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const result = await bookingService.createBooking(payload);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await bookingService.cancelBooking(id);
      res.json({ message: "Booking cancelled" });
    } catch (err) {
      next(err);
    }
  }

  static async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await bookingService.listAllBookings();
      res.json(list);
    } catch (err) {
      next(err);
    }
  }
}
