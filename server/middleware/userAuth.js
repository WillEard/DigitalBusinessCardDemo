import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    // User is not signed in – expected case
    return res.status(401).json({ success: false, message: 'User not signed in' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode?.id) {
      req.body.userId = tokenDecode.id;
      next();
    } else {
      return res.status(401).json({ success: false, message: 'Invalid token payload' });
    }
  } catch (error) {
    // This is a real error (e.g. expired or malformed token)
    console.error('Auth Middleware Error:', error);
    return res.status(500).json({ success: false, message: 'Authentication failed' });
  }
};

export default userAuth;