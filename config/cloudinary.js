import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
//reload the environment variables to ensure they are available for cloudinary configuration

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary;