// src/services/authService.js
import User from "../models/User.js";
import CV from "../models/CV.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import {
  generateOTP,
  getOTPExpiry,
  isOTPExpired,
  validateOTP,
} from "../utils/otp.js";
import { generateToken } from "../utils/jwt.js";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendRegistrationEmail,
} from "../utils/email.js";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "../constants/errorMessages.js";

export class AuthService {
  static async register(userData) {
    const { name, username, email, password, phoneNumber } = userData;

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { phoneNumber }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new Error(ERROR_MESSAGES.EMAIL_IN_USE);
      }
      if (existingUser.phoneNumber === phoneNumber) {
        throw new Error(ERROR_MESSAGES.PHONE_IN_USE);
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    // Create CV record
    await CV.create({
      user_id: user._id,
    });

    // Send registration email
    await sendRegistrationEmail(email, username, name);

    // Generate token
    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      token,
      message: SUCCESS_MESSAGES.REGISTERED,
    };
  }

  static async login(email, password) {
    // Find user and include password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error(ERROR_MESSAGES.INCORRECT_PASSWORD);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        isVerified: user.isVerified,
      },
      token,
      message: SUCCESS_MESSAGES.LOGGED_IN,
    };
  }

  static async sendVerificationOTP(userId) {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    if (user.isVerified) {
      throw new Error(ERROR_MESSAGES.ALREADY_VERIFIED);
    }

    // Generate and save OTP
    const otp = generateOTP();
    user.verifyOTP = otp;
    user.verifyOTPExpiry = getOTPExpiry(24 * 60); // 24 hours
    await user.save();

    // Send email
    await sendVerificationEmail(user.email, user.name, otp);

    return { message: SUCCESS_MESSAGES.OTP_SENT };
  }

  static async verifyEmail(userId, otp) {
    const user = await User.findById(userId).select(
      "+verifyOTP +verifyOTPExpiry",
    );

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    if (!validateOTP(otp, user.verifyOTP)) {
      throw new Error(ERROR_MESSAGES.INVALID_OTP);
    }

    if (isOTPExpired(user.verifyOTPExpiry)) {
      throw new Error(ERROR_MESSAGES.OTP_EXPIRED);
    }

    // Update user
    user.isVerified = true;
    user.verifyOTP = "";
    user.verifyOTPExpiry = 0;
    await user.save();

    return { message: SUCCESS_MESSAGES.EMAIL_VERIFIED };
  }

  static async sendPasswordResetOTP(email) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Generate and save OTP
    const otp = generateOTP();
    user.resetOTP = otp;
    user.resetOTPExpireAt = getOTPExpiry(15); // 15 minutes
    await user.save();

    // Send email
    await sendPasswordResetEmail(user.email, user.name, otp);

    return { message: SUCCESS_MESSAGES.OTP_SENT };
  }

  static async resetPassword(email, otp, newPassword) {
    const user = await User.findOne({ email }).select(
      "+resetOTP +resetOTPExpireAt",
    );

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    if (!validateOTP(otp, user.resetOTP)) {
      throw new Error(ERROR_MESSAGES.INVALID_OTP);
    }

    if (isOTPExpired(user.resetOTPExpireAt)) {
      throw new Error(ERROR_MESSAGES.OTP_EXPIRED);
    }

    // Hash and update password
    user.password = await hashPassword(newPassword);
    user.resetOTP = "";
    user.resetOTPExpireAt = 0;
    await user.save();

    return { message: SUCCESS_MESSAGES.PASSWORD_RESET };
  }

  static async verifyPassword(userId, password) {
    const user = await User.findById(userId).select("+password");

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const isPasswordValid = await comparePassword(password, user.password);
    return { valid: isPasswordValid };
  }

  static async verifyResetOTP(email, otp) {
    const user = await User.findOne({ email }).select(
      "+resetOTP +resetOTPExpireAt",
    );

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    if (!validateOTP(otp, user.resetOTP)) {
      throw new Error(ERROR_MESSAGES.INVALID_OTP);
    }

    if (isOTPExpired(user.resetOTPExpireAt)) {
      throw new Error(ERROR_MESSAGES.OTP_EXPIRED);
    }

    return { message: "OTP is valid" };
  }
}
