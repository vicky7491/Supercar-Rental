import UserModel from "../models/User.js";

const userService = {
  createUser: async ({ firstname, lastname, email, password, role }) => {
    if (!firstname || !lastname || !email || !password || !role) {
      throw new Error("All fields are required");
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
      role
    });

    return user;
  }
};

export default userService;
