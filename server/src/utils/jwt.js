// src/utils/jwt.js
import jwt from "jsonwebtoken";
import { config } from "../config/environment.js";

export const generateToken = (userId, expiresIn = config.jwtExpiry) => {
  return jwt.sign({ id: userId }, config.jwtSecret, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};
