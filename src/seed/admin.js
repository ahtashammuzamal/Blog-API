import { connectDB } from "../config/db.js";
import { User } from "../models/user.model.js";

const seedAdmin = async () => {
  try {
    await connectDB();
    const admin = await User.create({
      name: "Muhammad Ahtasham",
      email: "ahtashammuzamal@gmail.com",
      password: "abcd1234",
      role: "admin",
    });

    console.log("Admin user successfully created", admin);
  } catch (error) {
    console.log("Error", error);
  }
};

seedAdmin();
