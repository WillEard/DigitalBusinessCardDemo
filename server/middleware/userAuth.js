import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  console.log('Cookies in auth middleware:', req.cookies);

  console.log('Cookies in auth middleware:', req.cookies);
  const { token } = req.cookies;
  console.log('token:', token);

  if (!token) {
    return res.status(401).json({ success: false, message: 'User not signed in' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    console.log('tokenDecode:', tokenDecode);

    const userId = tokenDecode?.id || tokenDecode?.userId;
    console.log('userAuth set req.body.userId =', userId);

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Invalid token payload' });
    }

    req.body.userId = userId;
    console.log('Decoded token:', tokenDecode);
    return next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }
};

export default userAuth;