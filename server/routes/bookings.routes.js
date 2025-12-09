import express from "express";
import {
  createBooking,
  getBookingsByDate,
  getAvailableSlots,
  getAllBookings,
  updateBookingStatus,
  getUserBookings,
} from "../controllers/booking.controller.js";
import { verifyClerkToken, verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/my-bookings", getUserBookings);
router.get("/date", getBookingsByDate); // Kept public/user-accessible if needed for availability
router.get("/available", getAvailableSlots);

// Admin Routes
router.get("/", verifyClerkToken, verifyAdmin, getAllBookings);
router.put("/:bookingId/status", verifyClerkToken, verifyAdmin, updateBookingStatus);

export default router;
