import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
   
      firstname: {
        type: String,
        required: [true, "First name is required"],
        minlength: [3, "First name must be at least 3 characters long"],
      },
      lastname: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [3, "Last name must be at least 3 characters long"],
      },
    
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [4, "Email must be at least 4 characters long"],
    },

    password: { type: String, required: true, select: false, minlength:5 },

    role: { type: String, required: true, enum: ["seller", "renter"] },

    socketId: { type: String },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this.id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  return token;
};
// Compare hashed passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// Hash password before saving
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
}


const UserModel = mongoose.model("User", userSchema);
export default UserModel;
