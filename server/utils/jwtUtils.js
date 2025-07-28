import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;  // Keep this secret key private and secure

// Helper function to create a JWT token
export const createJWTToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      name: user.name,
    },
    SECRET_KEY,  // Keep this secret key private
    { expiresIn: '1d' }  // Set token expiration time (e.g., 1 day)
  );
};