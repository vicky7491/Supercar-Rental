import Vehicle from "../models/Vehicle.js";
import { validationResult } from "express-validator";

// ✅ Create new vehicle listing (Only Sellers)
const createVehicle = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // Create vehicle
    const vehicleData = { ...req.body, owner: req.user.id }; // Owner from authMiddleware
    const vehicle = await Vehicle.create(vehicleData);

    res.status(201).json({ message: "Vehicle created successfully", vehicle });
  } catch (error) {
    res.status(500).json({ message: "Vehicle creation failed", error: error.message });
  }
};

// ✅ Get all vehicles (Public with optional filters)
const getVehicles = async (req, res) => {
  try {
    const { vehicleType, minRate, status } = req.query;
    const filter = {};

    if (vehicleType) filter.vehicleType = vehicleType;
    if (status) filter.status = status;
    if (minRate) filter.hourlyRate = { $gte: minRate };

    const vehicles = await Vehicle.find(filter).populate("owner", "firstname lastname email");

    res.json({ count: vehicles.length, vehicles });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vehicles", error: error.message });
  }
};

// ✅ Get a specific vehicle by ID (Public)
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate("owner", "firstname lastname email");

    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vehicle", error: error.message });
  }
};

// ✅ Update vehicle (Owner only)
const updateVehicle = async (req, res) => {
  try {
    // Prevent updating the owner or ID
    const { owner, _id, ...updateData } = req.body;

    const vehicle = await Vehicle.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!vehicle) return res.status(404).json({ message: "Vehicle not found or unauthorized" });
    res.json({ message: "Vehicle updated successfully", vehicle });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// ✅ Delete vehicle (Owner only)
const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOneAndDelete({ _id: req.params.id, owner: req.user.id });

    if (!vehicle) return res.status(404).json({ message: "Vehicle not found or unauthorized" });
    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

export default { createVehicle, getVehicles, getVehicleById, updateVehicle, deleteVehicle };
