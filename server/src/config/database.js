// src/config/database.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✓ Connected to MongoDB");
    return mongoose.connection;
  } catch (err) {
    console.error("✗ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("✓ Disconnected from MongoDB");
  } catch (err) {
    console.error("✗ MongoDB Disconnection Error:", err.message);
  }
};
