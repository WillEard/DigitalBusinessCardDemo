// src/routes/userRoutes.js
import express from "express";
import * as userController from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All user routes require authentication
router.use(protect);

router.get("/data", userController.getUserData);
router.post("/update", userController.updateUserSettings);
router.delete("/delete", userController.deleteAccount);

export default router;
