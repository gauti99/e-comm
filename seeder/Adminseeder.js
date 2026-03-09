import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@gmail.com" });
    
    if (adminExists) {
      console.log("⚠️ Admin already exists!");
      console.log(`Admin ID: ${adminExists._id}`);
      process.exit();
    }

    // Create Admin (use save to trigger password hashing)
    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: "123456",
      role: "admin",
    });

    const createdAdmin = await admin.save();

    console.log("✅ Admin Seeder Data Imported!");
    console.log(`Admin created with ID: ${createdAdmin._id}`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();