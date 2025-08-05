import mongoose from 'mongoose';
import User from '../models/userModel.js';

export const adminAuth = async (req, res, next) => {
  try {
    const userId = req.body?.userId;

    console.log('adminAuth start - req.body.userId:', req.body?.userId, 'req.user:', req.user);

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user id' });
    }

    const user = await User.findById(userId).select('-password -resetToken -__v').lean();
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admins only' });
    }

    req.user = user; // attach for controller use
    next();
  } catch (err) {
    console.error('adminAuth error:', err);
    return res.status(500).json({ success: false, message: 'Server error during admin authorization' });
  }
};

// optional generic role checker (named export)
export const requireRole = (roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Not authenticated' });
  const allowed = Array.isArray(roles) ? roles : [roles];
  if (!allowed.includes(req.user.role)) return res.status(403).json({ success: false, message: 'Insufficient permissions' });
  next();
};

export default adminAuth;