import express from "express";
import upload from "../middleware/upload.js"; // ✅ your Cloudinary storage

const router = express.Router();

// POST /api/upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    res.json({
      message: "Image uploaded",
      url: req.file.path, 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;