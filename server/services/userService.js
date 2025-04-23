import UserModel from "../models/User.js";

const userService = {
  createUser: async ({ firstname, lastname, email, password, role, aadharCard }) => {
    if (!firstname || !lastname || !email || !password || !role) {
      throw new Error("All fields are required");
    }

     // Additional check for sellers
     if (role === "seller" && !aadharCard) {
      throw new Error("Aadhar card is required for sellers");
    }



    // ✅ Check if email is already in use
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // ✅ Create user with proper schema
    const user = await UserModel.create({
      firstname,
      lastname,
      email,
      password,
      role,
      aadharCard
    });

    return user;
  }
};

export default userService;
