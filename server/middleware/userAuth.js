import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  console.log('Cookies in auth middleware:', req.cookies);  // << Add this

  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: 'User not signed in' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode?.userId) {
      req.body.userId = tokenDecode.userId;
      next();
      console.log('Decoded token:', tokenDecode);
    } else {
      return res.status(401).json({ success: false, message: 'Invalid token payload' });
    }
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }
};

export default userAuth;