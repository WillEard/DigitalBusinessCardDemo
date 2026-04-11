// src/routes/adminRoutes.js
import express from "express";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All admin routes require authentication
router.use(protect);

// TODO: Implement admin routes
// Examples:
// - GET /users - List all users
// - GET /users/:id - Get user details
// - DELETE /users/:id - Delete user
// - GET /stats - Get system statistics
// - POST /audit-logs - View audit logs

router.get("/health", (req, res) => {
  res.json({ status: "Admin routes available" });
});

export default router;
