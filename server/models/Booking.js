const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending" 
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending"
    },
    cancellationReason: String,
    paymentId: String, // For payment gateway reference
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // Vehicle owner
  },
  { timestamps: true }
);