import express from 'express';
import { isAuthenticated, login, logout, register, resetPassword, sendResetOTP, sendVerifyOtp, verifyEmail, verifyPassword } from '../controllers/authController.js';
import { googleLogin } from '../controllers/googleAuthController.js';  // Import your new Google login controller
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

// /API/AUTH/...
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.get('/is-Auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOTP);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/verify-password', userAuth, verifyPassword);


// New route for Google login
authRouter.post('/google-login', googleLogin);

export default authRouter;