// src/services/userService.js
import User from "../models/User.js";
import CV from "../models/CV.js";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "../constants/errorMessages.js";

const ALLOWED_USER_FIELDS = ["subscriptionType", "showMobile", "phoneNumber"];

export class UserService {
  static async getUserData(userId) {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return {
      userData: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isVerified: user.isVerified,
        subscriptionType: user.subscriptionType,
        role: user.role,
        showMobile: user.showMobile,
        createdAt: user.createdAt,
      },
    };
  }

  static async updateUserSettings(userId, updates) {
    // Filter only allowed fields
    const filteredUpdates = {};
    for (const field of ALLOWED_USER_FIELDS) {
      if (field in updates) {
        filteredUpdates[field] = updates[field];
      }
    }

    if (Object.keys(filteredUpdates).length === 0) {
      throw new Error(ERROR_MESSAGES.NO_VALID_FIELDS);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: filteredUpdates },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return {
      data: updatedUser,
      message: SUCCESS_MESSAGES.SETTINGS_UPDATED,
    };
  }

  static async deleteAccount(userId) {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Delete associated CV
    await CV.deleteMany({ user_id: userId });

    return { message: SUCCESS_MESSAGES.ACCOUNT_DELETED };
  }
}
