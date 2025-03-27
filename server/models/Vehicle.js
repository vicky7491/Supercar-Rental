import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    owner: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: [true, "Owner is required"]
    },
    vehicleType: { 
      type: String, 
      required: [true, "Vehicle type is required"], 
      enum: {
        values: ["supercar", "car", "superbike", "bike"],
        message: "Invalid vehicle type"
      }
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true
    },
    model: {
      type: String,
      required: [true, "Model is required"],
      trim: true
    },
    hourlyRate: {
      type: Number,
      required: [true, "Hourly rate is required"],
      min: [100, "Minimum hourly rate is ₹100"]
    },
    status: { 
      type: String,
      enum: {
        values: ['available', 'unavailable'],
        message: "Invalid status"
      }, 
      default: "unavailable" 
    },
    color: { 
      type: String, 
      required: [true, "Color is required"], 
      minlength: [3, "Color must be at least 3 characters long"] 
    },
    plate: { 
      type: String, 
      required: [true, "License plate is required"], 
      unique: true,
      validate: {
        validator: function(v) {
          return /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/.test(v);
        },
        message: "Invalid license plate format (e.g. MH02AB1234)"
      }
    },
    capacity: { 
      type: Number, 
      required: [true, "Capacity is required"], 
      min: [1, "Capacity must be at least 1"] 
    },
    features: {
      insuranceValid: {
        type: Boolean,
        default: false
      },
      transmission: {
        type: String,
        enum: ["manual", "automatic"]
      }
    }
  }, 
  { 
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
  }
);


vehicleSchema.index({ vehicleType: 1, status: 1 });

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;