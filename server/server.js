import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
 
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


// Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
app.use('/users', userRoutes);

// Connect to Database
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀Server running on port ${PORT}`));
