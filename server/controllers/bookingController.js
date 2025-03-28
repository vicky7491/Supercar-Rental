import { Booking } from "../models/Booking.js";

import Vehicle from "../models/Vehicle.js";
import { validationResult } from "express-validator";

// ✅ Create a new booking
const createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    const { vehicleId, startTime, endTime } = req.body;

    // Check if the vehicle exists
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    // Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
        vehicle: vehicleId,
        $or: [
          { startTime: { $lt: endTime }, endTime: { $gt: startTime } } // ✅ Correct condition
        ]
      });
      
    if (overlappingBooking) {
      return res.status(400).json({ message: "Vehicle is already booked for this time slot" });
    }

    const hours = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60); // Convert milliseconds to hours
    const totalPrice = hours * vehicle.hourlyRate;


    // Create booking
    const booking = await Booking.create({
        user: req.user.id,
        vehicle: vehicleId,
        startTime,
        endTime,
        totalPrice,  // ✅ Include total price
      });
      

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
};

// ✅ Get all bookings (Admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "firstname lastname email").populate("vehicle");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

// ✅ Get bookings for a specific user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("vehicle");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user bookings", error: error.message });
  }
};

// ✅ Cancel a booking (User)
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Cancellation failed", error: error.message });
  }
};

export default { createBooking, getAllBookings, getUserBookings, cancelBooking };
