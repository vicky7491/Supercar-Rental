import express from "express";
import { body, param } from "express-validator";
import bookingController from "../controllers/bookingController.js";

import authUser from "../middleware/authMiddleware.js";  // ✅ Fixed Import

const router = express.Router();

// ✅ Booking Validation Rules
const validateBooking = [
  body("vehicleId").isMongoId().withMessage("Invalid vehicle ID"),
  body("startTime").isISO8601().withMessage("Invalid start time"),
  body("endTime").isISO8601().withMessage("Invalid end time")
];

// ✅ Route: Create Booking
router.post("/bookings", authUser, validateBooking, bookingController.createBooking);

// ✅ Route: Get All Bookings (Admin Only)
router.get("/", authUser, bookingController.getAllBookings);

// ✅ Route: Get User's Bookings
router.get("/my-booking", authUser, bookingController.getUserBookings);

// ✅ Route: Cancel Booking
router.delete("/:id", authUser, param("id").isMongoId().withMessage("Invalid booking ID"), bookingController.cancelBooking);

export { router as bookingRoutes };
