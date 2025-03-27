import Vehicle from "../models/Vehicle.js";

const checkVehicleOwner = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate("owner").lean(); // Optimize with .lean()
    
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    if (vehicle.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: You do not own this vehicle" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error verifying ownership", error: error.message });
  }
};

export default checkVehicleOwner;
