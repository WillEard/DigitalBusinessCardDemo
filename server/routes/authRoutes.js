import express from 'express';
import { isAuthenticated, login, logout, register, resetPassword, sendResetOTP, sendVerifyOtp, verifyEmail, verifyPassword, verifyReset } from '../controllers/authController.js';
import { googleLogin } from '../controllers/googleAuthController.js';  // Import your new Google login controller
import userAuth from '../middleware/userAuth.js';
import { auth } from 'google-auth-library';

const authRouter = express.Router();

// /API/AUTH/...

// Authentication
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

// Send OTP email to verify
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);

// Verify email OTP
authRouter.post('/verify-account', userAuth, verifyEmail);

// TRUE/FALSE is authenticated
authRouter.get('/is-Auth', userAuth, isAuthenticated);

// Send email with OTP to reset password
authRouter.post('/send-reset-otp', sendResetOTP);

// Reset users password when a new valid one is entered
authRouter.post('/reset-password', resetPassword);

// Verify password entered with one stored in DB
authRouter.post('/verify-password', userAuth, verifyPassword);

// Verify OTP entered for resetting password
authRouter.post('/verify-reset-otp', userAuth, verifyReset);


// New route for Google login
authRouter.post('/google-login', googleLogin);

export default authRouter;