import express from "express";
import { body } from "express-validator";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();


router.post("/register" , [
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('fullname.firstname').isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body('fullname.lastname').isLength({ min: 3 }).withMessage("Last name must be at least 3 characters long"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body('role').isIn(["seller", "renter"]).withMessage("Role must be either seller or renter")
], userController.registerUser);

router.post("/login", [
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
],userController.loginUser);

router.get("/profile",authMiddleware, userController.getUserProfile);
router.get("/logout", authMiddleware, userController.logoutUser);



export default router;
 