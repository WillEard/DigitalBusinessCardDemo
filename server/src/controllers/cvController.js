// src/controllers/cvController.js
import { CVService } from "../services/cvService.js";

export const saveCVData = async (req, res, next) => {
  try {
    // Get userId from auth middleware (req.body.userId was set by auth middleware)
    const userId = req.body.userId || req.user?.userId;
    const cvData = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID is required",
      });
    }

    const result = await CVService.saveCVData(userId, cvData);

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getCVData = async (req, res, next) => {
  try {
    const userId = req.user?.userId || req.body.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID is required",
      });
    }

    const result = await CVService.getCVData(userId);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getCVDataByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    const result = await CVService.getCVDataByUsername(username);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCV = async (req, res, next) => {
  try {
    const userId = req.body.userId || req.user?.userId;
    const { cvId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (!cvId) {
      return res.status(400).json({
        success: false,
        message: "CV ID is required",
      });
    }

    const result = await CVService.deleteCV(userId, cvId);

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
