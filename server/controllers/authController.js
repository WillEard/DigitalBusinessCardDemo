import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import userModel from '../models/userModel.js';
import cvModel from '../models/cvModel.js';
import transporter from '../config/nodemailer.js';
import date from 'date-and-time';

import { EMAIL_VERIFY_TEMPLATE, PASSWIRD_RESET_TEMPLATE, REGISTER_TEMPLATE } from '../config/emailTemplates.js';

// Registration
export const register = async (req, res) => {
    const {name, username, email, password, phoneNumber, role, subscriptionType, education, experience, skills, certifications, projects, languages, hobbies, achievements} = req.body;

    if (!name || !email || !password || !username)
    {
        return res.status(400).json({message: "Please fill in all fields"});
    }

    try {
        const existingUser = await userModel.findOne({ 
            $or: [
              { email: email },
              { phoneNumber: phoneNumber }
            ]
          });

        if (existingUser)
        {
           return res.json({success: false, message: "Email or phone number already in use"});
        }
        
        const hashedPW = await bcrypt.hash(password, 10);

        const user = new userModel({name, username, email, password: hashedPW, phoneNumber, subscriptionType, role});
        await user.save();

        const cv = new cvModel({ user_id: user._id, education, experience, skills, certifications, projects, languages, hobbies, achievements});
        await cv.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', maxAge: 7 * 24 * 60 * 60 * 1000})
        
        const now = new Date();
        date.format(now, 'YYYY/MM/DD HH:mm:ss');

        // Send email after registration
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'PelagoPass',
            text: `Hello, ${name}! <br> Your account has been created with the email: ${email} at ${now}. <br> Make sure to verify your account to get access to all basic features.`,
            html: REGISTER_TEMPLATE.replace("{{email}}", email).replace("{{user}}", user.username)
        };

        await transporter.sendMail(mailOptions, (err, res) => {
            if (err) {
                return res.status(400).json({success: false, message: "Error sending email."});
            } else
            {
                return res.status(200).json({success: true, message: "Email successfully sent."});
            }
        });
        
        return res.json({success: true});

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

// Login
export const login = async (req, res) => {
    const {email, password} = req.body;
  
    if (!email || !password)
    {
        return res.status(400).json({message: "Please fill in all fields"});
    } 

    try {
        const user = await userModel.findOne({email});

        if (!user)
        {
            return res.json({success: false, message: "User does not exist"});
        } 

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
        {
            return res.json({success: false, message: "Incorrect password"});
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            name: user.name,
          }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const isProduction = process.env.NODE_ENV === 'production' || process.env.FORCE_SECURE === 'true';

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            domain: process.env.NODE_ENV === 'production' ? '.pelagopass.com' : undefined,
          });

        return res.json({success: true});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

// Logout
export const logout = async (req, res) => {
    try {
      const isProduction = process.env.NODE_ENV === 'production' || process.env.FORCE_SECURE === 'true';
  
      res.clearCookie('token', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        domain: isProduction ? '.pelagopass.com' : undefined,  // 🔥 match login exactly
        path: '/', // 🔥 always include this unless you've set a different path
      });
  
      return res.json({ success: true, message: "Logged out" });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  };

// Verification OTP to user email
export const sendVerifyOtp = async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if (user.isVerified)
        {
            return res.json({success: false, message: "User is already verified"});
        }

       const otp = String(Math.floor(100000 + Math.random() * 900000));

       user.verifyOTP = otp;
       user.verifyOTPExpiry = Date.now() + 24 * 60 * 60 * 1000;

       await user.save();

       const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "Verify your email",
        text: `Hello, ${user.name},`,
        html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email).replace("{{name}}", user.name)
       };

       await transporter.sendMail(mailOptions);

       res.json({success: true, message: 'Email OTP verification has been sent.'});
        
    } catch (error) {
        res.json({success: false, message: error.message});    
    }
}

// Verifying OTP code entered by user using email
export const verifyEmail = async (req, res) => {
    const {userId, otp} = req.body;

    if (!userId || !otp)
    {
        return res.json({success: false, message: "Invalid request, missing details."});
    }

    try {
        const user = await userModel.findById(userId);

        if (!user)
        {
            return res.json({success: false, message: "User not found."});
        }

        if (user.verifyOTP === '' || user.verifyOTP !== otp)
        {
            return res.json({success: false, message: "Invalid OTP."});
        }

        if (user.verifyOTPExpiry < Date.now()) 
        {
            return res.json({success: false, message: "OTP expired."});
        }

        user.isVerified = true;
        user.verifyOTP = '';
        user.verifyOTPExpiry = 0;

        await user.save();

        return res.json({success: true, message: "Email verified successfully."});

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

// Check if user is authenticated / logged in
export const isAuthenticated = async (req, res) => {
    try {   
        return res.json({success: true})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// Send password reset OTP
export const sendResetOTP = async (req, res) => {
    
    const {email} = req.body;

    if (!email){
        return res.json({success: false, message: "Email required"});
    }

    try {
        const user = await userModel.findOne({email});

        if (!user){
            return res.json({success: false, message: "User not found"});
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOTP = otp;
        user.resetOTPExpireAt = Date.now() + 15 * 60 * 60 * 1000; 

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset",
            //text: `Reset your password by using the code: ${otp}. It will expire after 15 minutes.`,
            html: PASSWIRD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email).replace("{{name}}", user.name)
        };

        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: "OTP has been sent to your email"})

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

// Reset password
export const resetPassword = async (req, res) => {
    const { email, otp, newPass } = req.body;

  if (!email || !otp || !newPass) {
    return res.json({ success: false, message: 'Email, OTP, and password are required.' });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Make sure OTP matches exactly (convert to string to be safe)
    if (!user.resetOTP || String(user.resetOTP) !== String(otp)) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    // Check if OTP expired
    if (user.resetOTPExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP has expired" });
    }

    // Hash the new password securely
    const hashedPW = await bcrypt.hash(newPass, 10);

    // Update user's password and clear OTP data
    user.password = hashedPW;
    user.resetOTP = '';
    user.resetOTPExpireAt = 0;

    await user.save();

    return res.json({ success: true, message: 'Password has been reset successfully.' });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

export const saveCV = async (req, res) => {
    const {userId, education, experience, skills, certifications, projects, languages, hobbies, achievements} = req.body;

    if (!userId) {
        return res.json({success: false, message: "User ID is required"});
    }

    try {
        const cv = await cvModel.findOne({user_id: userId});

        if (!cv) {
            return res.json({success: false, message: "CV not found for this user"});
        }

        cv.education = education;
        cv.experience = experience;
        cv.skills = skills;
        cv.certifications = certifications;
        cv.projects = projects;
        cv.languages = languages;
        cv.hobbies = hobbies;
        cv.achievements = achievements;

        await cv.save();

        return res.json({success: true, message: "CV saved successfully"});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

export const verifyPassword = async (req, res) => {
    try {
      const { password } = req.body;
  
      if (!password) {
        return res.status(400).json({ valid: false, message: "Password is required" });
      }
  
      // Assuming req.user contains the authenticated user ID (set by your auth middleware)
      const userId = req.body.userId;
  
      // Fetch user from DB
      const user = await userModel.findById(userId).select('+password'); // select hashed password explicitly
  
      if (!user) {
        return res.status(404).json({ valid: false, message: "User not found" });
      }
  
      // Compare entered password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        return res.json({ valid: true });
      } else {
        return res.json({ valid: false });
      }
    } catch (error) {
      console.error("Error verifying password:", error);
      return res.status(500).json({ valid: false, message: "Server error" });
    }
  };

export const verifyReset = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) return res.json({ success: false, message: "User not found" });

        if (!user.resetOTP || user.resetOTP !== String(otp)) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.resetOTPExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP has expired" });
        }

        return res.json({ success: true, message: "OTP is valid" });
    } catch (error) {
        return res.status(500).json({ valid: false, message: "Error verifying OTP" });
    }
}