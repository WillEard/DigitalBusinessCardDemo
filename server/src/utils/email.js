// src/utils/email.js
import nodemailer from "nodemailer";
import { config } from "../config/environment.js";
import {
  PASSWORD_RESET_TEMPLATE,
  EMAIL_VERIFY_TEMPLATE,
  REGISTRATION_TEMPLATE,
} from "../config/email.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.senderEmail,
    pass: config.senderPassword,
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: config.senderEmail,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
};

export const sendVerificationEmail = async (email, name, otp) => {
  const html = EMAIL_VERIFY_TEMPLATE.replace("{{name}}", name)
    .replace("{{otp}}", otp)
    .replace("{{year}}", new Date().getFullYear());
  return sendEmail(email, "Verify your email", html);
};

export const sendPasswordResetEmail = async (email, name, otp) => {
  const html = PASSWORD_RESET_TEMPLATE.replace("{{name}}", name)
    .replace("{{otp}}", otp)
    .replace("{{year}}", new Date().getFullYear());
  return sendEmail(email, "Reset your password", html);
};

export const sendRegistrationEmail = async (email, username, fullName) => {
  const html = REGISTRATION_TEMPLATE.replace("{{email}}", email)
    .replace("{{user}}", username)
    .replace("{{year}}", new Date().getFullYear());
  return sendEmail(email, "Welcome to PelagoPass", html);
};
