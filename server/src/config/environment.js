// src/config/environment.js
export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 4000,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: process.env.JWT_EXPIRY || "7d",
  senderEmail: process.env.SENDER_EMAIL || "test@example.com",
  senderPassword: process.env.SENDER_PASSWORD || "test_password",
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",

  // Derived flags
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
};

export const validateConfig = () => {
  const required = ["mongodbUri", "jwtSecret"];
  const missing = required.filter((key) => !config[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }

  // Warn in development if email not configured
  if (
    config.isDevelopment &&
    (!process.env.SENDER_EMAIL || !process.env.SENDER_PASSWORD)
  ) {
    console.warn(
      "⚠ Email credentials not configured. Email features will be disabled.",
    );
  }
};
