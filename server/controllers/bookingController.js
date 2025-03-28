import { Booking } from "../models/Booking.js";
import transporter from "../config/nodemailer.js"; // ✅ Import nodemailer transporter
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
      console.log("User Email:", req.user.email);
    // Send confirmation email (optional)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.user.email,
      subject: "Booking Confirmation - Supercar Rental",
      html: `
  <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; background: #f9f9f9;">
    <h2 style="color: #27ae60; text-align: center;">Booking Confirmed ✅</h2>
    
    <p>Dear <strong>${req.user.firstname}</strong>,</p>
    
    <p>Your booking for <strong style="color: #e67e22;">${vehicle.brand} ${vehicle.model}</strong> has been successfully confirmed!</p>
    
    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Start Time:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date(startTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>End Time:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date(endTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Total Price:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong style="color: #2c3e50;">₹${totalPrice.toLocaleString("en-IN")}</strong></td>
      </tr>
    </table>

    <p style="margin-top: 20px;">We appreciate your trust in <strong>Supercar Rental</strong>. Enjoy your ride! 🚗💨</p>

    <div style="text-align: center; margin-top: 20px;">
      <a href="https://supercarrental.com/bookings/${booking._id}" 
         style="display: inline-block; padding: 12px 24px; background: #3498db; color: white; text-decoration: none; font-size: 16px; border-radius: 5px;">
        View Your Booking
      </a>
    </div>

    <p style="margin-top: 20px; font-size: 14px; color: #555;">If you have any questions, feel free to contact us.</p>
  </div>
`

    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Email failed to send:", err);
      } else {
        console.log("Booking confirmation email sent:", info.response);
      }
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
