import User from '../models/userModel.js';
import CV from '../models/cvModel.js';

export const getCVData = async (req, res) => {
  const { username } = req.params;

  console.log('Looking up user by username:', username); // Add this

  try {
    // Step 1: Find the user by username
    const user = await User.findOne({ username }).select('name email isVerified phoneNumber showMobile');
  
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 2: Find CV by the user's ObjectId (user._id)
    const cv = await CV.findOne({ user_id: user._id });
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    // Step 3: Conditionally include phoneNumber based on showPhoneNumber
    const phoneNumberToSend = user.showMobile ? user.phoneNumber : null;

    // Step 3: Return the CV data
    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        phoneNumber: phoneNumberToSend
      },
      cv,
    });
  } catch (error) {
    console.error('Error fetching CV:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCVData = async (req, res) => {
  const { username } = req.params;
  const updatedFields = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cv = await CV.findOneAndUpdate(
      { user_id: user._id },
      { $set: updatedFields },
      { new: true, upsert: true }
    );

    const verify = await CV.findOne({ user_id: user._id });

    res.json({
      success: true,
      message: 'CV updated successfully',
      cv: verify,
    });
  } catch (error) {
    console.error('Error updating CV:', error);
    res.status(500).json({ message: 'Server error' });
  }
};