import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/get-all-users", getAllUsers);
router.post("/login", loginUser);

// Protected route
router.get("/profile", protect, getUserProfile);

export default router;