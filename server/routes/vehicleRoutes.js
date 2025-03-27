import express from "express";
import { body, param } from "express-validator";
import vehicleController from "../controllers/vehicleController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Vehicle Validation Rules
const validateVehicle = [
  body("vehicleType")
    .isIn(["supercar", "car", "superbike", "bike"])
    .withMessage("Invalid vehicle type"),
  body("brand").trim().notEmpty().withMessage("Brand is required"),
  body("model").trim().notEmpty().withMessage("Model is required"),
  body("hourlyRate")
    .isFloat({ min: 100 })
    .withMessage("Minimum hourly rate is ₹100"),
  body("color").trim().isLength({ min: 3 }).withMessage("Color must be at least 3 characters"),
  body("plate")
    .matches(/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/)
    .withMessage("Invalid license plate format (e.g. MH02AB1234)"),
  body("capacity").isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
];

// ✅ Route: Create Vehicle (Only Sellers)
router.post("/", authMiddleware, validateVehicle, vehicleController.createVehicle);

// ✅ Route: Get All Vehicles (Public)
router.get("/", vehicleController.getVehicles);

// ✅ Route: Get Vehicle by ID (Public)
router.get(
  "/:id",
  param("id").isMongoId().withMessage("Invalid vehicle ID"),
  vehicleController.getVehicleById
);

// ✅ Route: Update Vehicle (Only Sellers)
router.put(
  "/:id",
  authMiddleware,
  param("id").isMongoId().withMessage("Invalid vehicle ID"),
  validateVehicle,
  vehicleController.updateVehicle
);

// ✅ Route: Delete Vehicle (Only Sellers)
router.delete(
  "/:id",
  authMiddleware,
  param("id").isMongoId().withMessage("Invalid vehicle ID"),
  vehicleController.deleteVehicle
);

export default router;
