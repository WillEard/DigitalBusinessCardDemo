import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  console.log('Cookies in auth middleware:', req.cookies);  // << Add this

  const { token } = req.cookies;

  if (!token) {
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
    console.error('Auth Middleware Error:', error);
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }
};

export default userAuth;