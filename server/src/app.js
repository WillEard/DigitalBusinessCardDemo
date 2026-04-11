// src/app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cvRoutes from "./routes/cvRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { getCorsOptions, getSecurityHeaders } from "./config/cors.js";
import requestLogger from "./middleware/logger.js";
import securityHeaders from "./middleware/security.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(requestLogger);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// CORS
app.use(cors(getCorsOptions()));

// Security Headers
app.use(securityHeaders);
app.use((req, res, next) => {
  const headers = getSecurityHeaders();
  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  next();
});

// Health check
app.get("/", (req, res) => {
  res.json({ message: "PelagoPass API is running" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cv", cvRoutes);
app.use("/api/admin", adminRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use(errorHandler);

export default app;
