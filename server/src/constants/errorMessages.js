// src/constants/errorMessages.js
export const ERROR_MESSAGES = {
  // Auth
  MISSING_FIELDS: "Please fill in all required fields",
  EMAIL_IN_USE: "Email is already in use",
  PHONE_IN_USE: "Phone number is already in use",
  USER_NOT_FOUND: "User not found",
  INCORRECT_PASSWORD: "Incorrect password",
  ALREADY_VERIFIED: "User is already verified",
  INVALID_OTP: "Invalid OTP",
  OTP_EXPIRED: "OTP has expired",
  INVALID_TOKEN: "Invalid authentication token",
  NOT_AUTHENTICATED: "User not authenticated",

  // CV
  CV_NOT_FOUND: "CV not found for this user",
  CV_SAVED_SUCCESS: "CV saved successfully",

  // User
  UNAUTHORIZED: "Unauthorized",
  NO_VALID_FIELDS: "No valid fields provided to update",

  // General
  SERVER_ERROR: "Internal server error",
  MISSING_ENV_VAR: "Missing required environment variable",
};

export const SUCCESS_MESSAGES = {
  REGISTERED: "User registered successfully",
  LOGGED_IN: "Logged in successfully",
  LOGGED_OUT: "Logged out successfully",
  OTP_SENT: "OTP has been sent to your email",
  EMAIL_VERIFIED: "Email verified successfully",
  PASSWORD_RESET: "Password has been reset successfully",
  SETTINGS_UPDATED: "Settings updated successfully",
  ACCOUNT_DELETED: "Account successfully deleted",
};
