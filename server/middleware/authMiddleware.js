import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const authUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1]; // ✅ Extract token from cookie or header
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const isBlacklisted = await User.findOne({token: token});
  if(isBlacklisted){
    return res.status(401).json({message: "Unauthorized"});
  };
  
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Verify token
    const user = await User.findById(decoded.id); // ✅ Find user by id
    req.user = user; // ✅ Attach user to req object
    next();

  }catch (error) {
    return res.status(401).json({message: "Unauthorized"});
  }
};



export default authUser;
