// src/middleware/auth.js
import { verifyToken } from "../utils/jwt.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";

export const protect = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: ERROR_MESSAGES.NOT_AUTHENTICATED,
      });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: ERROR_MESSAGES.INVALID_TOKEN,
      });
    }

    const userId = decoded.id || decoded.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: ERROR_MESSAGES.INVALID_TOKEN,
      });
    }

    req.user = { userId };
    req.body.userId = userId;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({
      success: false,
      message: ERROR_MESSAGES.NOT_AUTHENTICATED,
    });
  }
};

export default protect;
