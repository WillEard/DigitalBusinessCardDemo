import mongoose from 'mongoose';
import User from '../models/userModel.js';

// Listing users still queries DB (that's fine)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select('-password -resetToken').lean();
    return res.json({ success: true, users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error fetching users' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: 'Invalid id' });

    // Use req.user (set by adminAuth) to avoid re-querying the same admin user
    if (req.user && req.user._id?.toString() === id) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own account' });
    }

    const deleted = await User.findByIdAndDelete(id).select('-password -resetToken').lean();
    if (!deleted) return res.status(404).json({ success: false, message: 'User not found' });

    return res.json({ success: true, message: 'User deleted', user: deleted });
  } catch (err) {
    console.error('deleteUser error:', err);
    return res.status(500).json({ success: false, message: 'Server error deleting user' });
  }
};