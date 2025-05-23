import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Route Imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import {bookingRoutes} from "./routes/bookingRoutes.js"; // Added booking routes
dotenv.config();

// ✅ Connect to Database First
connectDB();

const app = express();

// ✅ Middleware Setup (correct order)
app.use(cors({
    origin: "http://localhost:5173", // ✅ Set this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // ✅ Allow cookies
}));
app.use(express.json()); // Parse JSON data
app.use(cookieParser()); // Parse cookies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data


// ✅ Static Files (if any)
app.use('/uploads', express.static('iamge-uploads')); 

// ✅ Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes); // Missing in your code, added it
app.use('/vehicles', vehicleRoutes); // Changed from singular `/vehicle` to plural `/vehicles`
app.use("/api", bookingRoutes); // Added booking routes
// app.use('/seller', require('./routes/seller'));
// app.use('/admin', require('./routes/admin'));
app._router.stack.forEach(function(r) {
  if (r.route && r.route.path) {
    console.log(r.route.path);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
