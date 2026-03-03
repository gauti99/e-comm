import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear old data
    await Product.deleteMany();
    await User.deleteMany();

    // Create Admin (use save to trigger password hashing)
    const admin = new User({
      name: " Admin",
      email: "admin@gmail.com",
      password: "123456",
      role: "admin",
    });

    const createdAdmin = await admin.save();

    const sampleProducts = [
      {
        name: "Oversized Hoodie",
        description: "Premium cotton hoodie",
        price: 1999,
        category: "Hoodie",
        brand: "HarshWear",
        image: "hoodie.jpg",
        countInStock: 20,
        sizes: ["S", "M", "L", "XL"],
        user: createdAdmin._id,
      },
      {
        name: "Street T-Shirt",
        description: "100% cotton streetwear tee",
        price: 999,
        category: "T-Shirt",
        brand: "HarshWear",
        image: "tshirt.jpg",
        countInStock: 50,
        sizes: ["S", "M", "L"],
        user: createdAdmin._id,
      },
    ];

    await Product.insertMany(sampleProducts);

    console.log("🔥 Seeder Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();