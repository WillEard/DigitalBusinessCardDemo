// src/routes/cvRoutes.js
import express from "express";
import * as cvController from "../controllers/cvController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All CV routes require authentication
router.use(protect);

router.post("/save", cvController.saveCVData);
router.get("/data", cvController.getCVData);
router.get("/:username", cvController.getCVDataByUsername);
router.delete("/:cvId", cvController.deleteCV);

export default router;
