// src/controllers/authController.js
import { AuthService } from "../services/authService.js";
import { config } from "../config/environment.js";

const getCookieOptions = () => ({
  httpOnly: true,
  secure: config.isProduction ? true : false,
  sameSite: config.isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
  ...(config.isProduction && { domain: ".pelagopass.com" }),
});

export const register = async (req, res, next) => {
  try {
    const { name, username, email, password, phoneNumber } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, username, email, and password are required",
      });
    }

    const result = await AuthService.register({
      name,
      username,
      email,
      password,
      phoneNumber,
    });

    res.cookie("token", result.token, getCookieOptions());

    res.status(201).json({
      success: true,
      message: result.message,
      user: result.user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await AuthService.login(email, password);
    const cookieOptions = getCookieOptions();

    console.log("Setting cookie with options:", cookieOptions);
    res.cookie("token", result.token, cookieOptions);
    console.log("Cookie set. Token:", result.token.substring(0, 20) + "...");

    res.json({
      success: true,
      message: result.message,
      user: result.user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: config.isProduction,
      sameSite: config.isProduction ? "none" : "lax",
      ...(config.isProduction && { domain: ".pelagopass.com" }),
      path: "/",
    });

    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const isAuthenticated = async (req, res, next) => {
  try {
    // Check if token exists in cookies
    const { token } = req.cookies;

    console.log(
      "isAuthenticated called. Cookies received:",
      Object.keys(req.cookies),
    );
    console.log("Token cookie present:", !!token);

    if (!token) {
      console.log("No token found in cookies");
      return res.json({ success: false });
    }

    // If there's a token, we're authenticated
    console.log("Token found, returning success");
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendVerifyOtp = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const result = await AuthService.sendVerificationOTP(userId);

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { userId, otp } = req.body;

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required",
      });
    }

    const result = await AuthService.verifyEmail(userId, otp);

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const sendResetOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const result = await AuthService.sendPasswordResetOTP(email);

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPass } = req.body;

    if (!email || !otp || !newPass) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and password are required",
      });
    }

    const result = await AuthService.resetPassword(email, otp, newPass);

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyPassword = async (req, res, next) => {
  try {
    const { userId, password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const result = await AuthService.verifyPassword(userId, password);

    res.json(result);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyReset = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const result = await AuthService.verifyResetOTP(email, otp);

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
