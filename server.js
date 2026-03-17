console.log("🔥 THIS EXACT SERVER FILE IS RUNNING 🔥");
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
// const cartRoutes = require('./routes/cartRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
}));




app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use('/api/cart', cartRoutes);




app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started successfully");
  console.log(`Server running on port ${PORT}`);
});