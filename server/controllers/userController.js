import UserModel from "../models/User.js";
import userService from "../services/userService.js";
import { validationResult } from "express-validator";
import BlacklistToken from "../models/blacklistTokenModel.js";


// ✅ This is the controller function that will be called when the user sends a POST request to /register   
 const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const { fullname , email, password, role } = req.body;

    const hashedPassword = await UserModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        role
    });
    const token = user.generateAuthToken();
    res.status(201).json({ token, user});
  };
  
const loginUser = async (req, res, next) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json({message: "Invalid email or password"});
    }
    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: "Invalid email or password"});
    }
    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({token, user});
};

const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
};

const logoutUser = async (req, res, next) => 
{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await BlacklistToken.create({token});
    res.status(200).json({message: "Logged out successfully"});

};


  export default {registerUser, loginUser, getUserProfile, logoutUser} ; // ✅ Default export