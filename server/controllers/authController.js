import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcypt from "bcryptjs"


// Register New User
export const registerUser = async (req, res) => {
  console.log("Incoming request body:", req.body); 
  const { name, email, password,confirmPassword,role } = req.body;

  console.log("Incoming request:", { name, email, password,confirmPassword,role });

  try {
    //Check if password match
    if(password !== confirmPassword){
      return res.status(400).json({message: "Password do not match"});
    }

    if (!role) {
      return res.status(400).json({ message: "Role is required. Choose 'seller' or 'renter'." });
    }

    //check if user already exist
    const userExists = await User.findOne({ email });
    console.log("User already exists:", email);
    if (userExists) return res.status(400).json({ message: "User already exists" });

    //Create new user
    const user = await User.create({ name, email, password,role:role || "renter" });
    console.log("User created successfully:", user);
    res.status(201).json({ 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      token: generateToken(user._id) 
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Successful login - Send JWT token
    res.json({ 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      token: generateToken(user._id) 
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
