// src/middleware/errorHandler.js
import { ERROR_MESSAGES } from "../constants/errorMessages.js";

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || ERROR_MESSAGES.SERVER_ERROR;

  // Wrong MongoDB ID
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new AppError(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    err = new AppError(message, 400);
  }

  // JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid token`;
    err = new AppError(message, 401);
  }

  // JWT expired
  if (err.name === "TokenExpiredError") {
    const message = `Token has expired`;
    err = new AppError(message, 401);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
