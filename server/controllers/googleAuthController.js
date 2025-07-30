import { OAuth2Client } from 'google-auth-library';
import User from '../models/userModel.js';  // Make sure to import your User model
import { createJWTToken } from '../utils/jwtUtils.js';  // A helper function to create JWT token

const clientId = process.env.VITE_GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientId);  // Replace with your actual Google Client ID


// Controller for handling Google login
export const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        googleId: sub,
        email,
        name,
        picture,
        provider: 'google',
      });
    }

    const jwtToken = createJWTToken(user);

    // Set JWT token as an HTTP-only cookie
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: process.env.NODE_ENV === 'production' ? '.pelagopass.com' : undefined,
    });
    
    res.json({
      success: true,
      user,
    });
    
  } catch (err) {
    console.error('Error during Google login:', err);
    res.status(400).json({ success: false, message: 'Invalid token or error during login' });
  }
};