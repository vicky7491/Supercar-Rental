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
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email format",
      ],
      lowercase: true, // Store emails in lowercase
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
      validate: {
        validator: function (v) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v);
        },
        message: "Password must contain uppercase, lowercase, and a number",
      },
    },

    role: { type: String, required: true, enum: ["seller", "renter"] },

     aadharCard: {
      type: String,
      validate: {
        validator: function (v) {
          return this.role === "seller" ? /^\d{12}$/.test(v) : true;
        },
        message: "Aadhar must be 12 digits for sellers",
      },
    },
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
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
