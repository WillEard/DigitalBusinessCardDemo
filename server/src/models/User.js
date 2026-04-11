// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // Don't return password by default
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    verifyOTP: {
      type: String,
      default: "",
      select: false,
    },
    verifyOTPExpiry: {
      type: Number,
      default: 0,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetOTP: {
      type: String,
      default: "",
      select: false,
    },
    resetOTPExpireAt: {
      type: Number,
      default: 0,
      select: false,
    },
    subscriptionType: {
      type: String,
      enum: ["Free", "Pro", "Premium"],
      default: "Free",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    showMobile: {
      type: Boolean,
      default: false,
    },
    lastLogin: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export default mongoose.models.User || mongoose.model("User", userSchema);
