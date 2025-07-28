import { OAuth2Client } from 'google-auth-library';
import User from '../models/userModel.js';  // Make sure to import your User model
import { createJWTToken } from '../utils/jwtUtils.js';  // A helper function to create JWT token

const clientId = process.env.VITE_GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientId);  // Replace with your actual Google Client ID


// Controller for handling Google login
export const googleLogin = async (req, res) => {
  const { token } = req.body;  // Google ID token sent from the frontend
  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,  // Ensure this matches your client ID
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload; // Extracted user data from Google

    // Check if the user already exists in your system by email
    let user = await User.findOne({ email });

    if (!user) {
      // If the user doesn't exist, create a new user in your database
        user = await User.create({
        googleId: sub,  // Store the unique Google user ID
        email,
        name,
        picture,
        provider: 'google',  // Track that this user logged in via Google
      });
    }

    // Create a session JWT token
    const jwtToken = createJWTToken(user);  // Replace with your JWT creation logic

    res.json({
      success: true,
      token: jwtToken,  // Send the JWT token for authentication
      user,  // Optionally, send the user data as well
    });
  } catch (err) {
    console.error('Error during Google login:', err);
    res.status(400).json({ success: false, message: 'Invalid token or error during login' });
  }
};