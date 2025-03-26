import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


export default router;
  
  //In the above code, we have created two routes for registering and logging in the user. 
 // Step 4: Create a Controller 
 // Now, we will create a controller file for handling the logic of the routes.