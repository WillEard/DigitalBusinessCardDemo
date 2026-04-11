// src/routes/authRoutes.js
import express from "express";
import * as authController from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/send-reset-otp", authController.sendResetOTP);
router.post("/reset-password", authController.resetPassword);
router.get("/is-Auth", authController.isAuthenticated); // Public - can be called without token

// Protected routes
router.post("/logout", protect, authController.logout);
router.post("/send-verify-otp", protect, authController.sendVerifyOtp);
router.post("/verify-account", protect, authController.verifyEmail);
router.post("/verify-password", protect, authController.verifyPassword);
router.post("/verify-reset-otp", protect, authController.verifyReset);

export default router;
