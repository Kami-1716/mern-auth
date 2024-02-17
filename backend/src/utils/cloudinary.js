import { v2 as cloudinary } from "cloudinary";
import ApiError from "./ApiErrors.js";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;
    const uploadFile = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    return uploadFile.url;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.error(error?.message);
  }
};

export { uploadToCloudinary };
