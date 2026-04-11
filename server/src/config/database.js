// src/config/database.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const options = {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      retryWrites: true,
    };

    // Log partial connection string for debugging (hide password)
    const connStr = process.env.MONGODB_URI;
    const maskedStr = connStr.replace(/:([^@]+)@/, ":***@");
    console.log(`Attempting to connect to: ${maskedStr}`);

    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log("✓ Connected to MongoDB");
    return mongoose.connection;
  } catch (err) {
    console.error("✗ MongoDB Connection Error:", err.message);
    if (err.message.includes("authentication failed")) {
      console.error("\n⚠️  MONGODB AUTHENTICATION FAILED");
      console.error("✗ Troubleshooting steps:");
      console.error("  1. Verify username and password in MongoDB Atlas");
      console.error(
        "  2. Check Network Access (IP Whitelist) in MongoDB Atlas",
      );
      console.error("  3. Ensure the user has database access permissions");
      console.error("  4. Try resetting the user password in MongoDB Atlas");
      console.error(
        "  5. Check that special characters in password are correct\n",
      );
    }
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
