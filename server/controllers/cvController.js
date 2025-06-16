import User from '../models/userModel.js';
import CV from '../models/cvModel.js';

export const getCVData = async (req, res) => {
  const { username } = req.params;

  console.log('Looking up user by username:', username); // Add this


  try {
    // Step 1: Find the user by username
    const user = await User.findOne({ username }).select('name email isVerified');
  
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 2: Find CV by the user's ObjectId (user._id)
    const cv = await CV.findOne({ user_id: user._id });
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    // Step 3: Return the CV data
    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
      cv,
    });
  } catch (error) {
    console.error('Error fetching CV:', error);
    res.status(500).json({ message: 'Server error' });
  }
};