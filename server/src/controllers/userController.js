// src/controllers/userController.js
import { UserService } from "../services/userService.js";
import { config } from "../config/environment.js";

export const getUserData = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const result = await UserService.getUserData(userId);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateUserSettings = async (req, res, next) => {
  try {
    const { userId, ...updates } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await UserService.updateUserSettings(userId, updates);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await UserService.deleteAccount(userId);

    res.clearCookie("token", {
      httpOnly: true,
      secure: config.isProduction,
      sameSite: config.isProduction ? "none" : "lax",
      ...(config.isProduction && { domain: ".pelagopass.com" }),
      path: "/",
    });

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
