import User from '../models/userModel.js';
import CV from '../models/cvModel.js';

// This function retrieves the CV data for a user based on their username.
// (Will be refactored to only be called for free users in the future)
export const getCVData = async (req, res) => {
  const { username } = req.params;

  console.log('Looking up user by username:', username); // Add this

  try {
    // Step 1: Find the user by username
    const user = await User.findOne({ username }).select('name email isVerified phoneNumber showMobile');
  
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 2: Find CV's by the user's ObjectId (user._id) (multiple CVs can exist for paid users))
    const cvs = await CV.find({ user_id: user._id }); // returns an array
    if (!cvs) {
      return res.status(404).json({ message: 'CV not found' });
    }

    // Step 3: Conditionally include phoneNumber based on showMobile
    const phoneNumberToSend = user.showMobile ? user.phoneNumber : null;

    // Step 3: Return the CV data
    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        phoneNumber: phoneNumberToSend,
      },
      cvs,
    });
  } catch (error) {
    console.error('Error fetching CV:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// This function updates the CV data for a user based on their username.
export const updateCVData = async (req, res) => {
  const { username, cvId } = req.params;
  const updatedFields = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the specific CV record by _id AND user_id for safety
    const cv = await CV.findOneAndUpdate(
      { _id: cvId, user_id: user._id },
      { $set: updatedFields },
      { new: true }
    );

    if (!cv) {
      return res.status(404).json({ message: 'CV not found for this user' });
    }

    res.json({
      success: true,
      message: 'CV updated successfully',
      cv,
    });
  } catch (error) {
    console.error('Error updating CV:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const newCV = async (req, res) => {
  const { username } = req.params;
  const newCVData = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new CV document linked to the user
    const newCV = new CV({
      user_id: user._id,
      ...newCVData,
    });

    await newCV.save();

    res.status(201).json({
      success: true,
      message: 'New CV created',
      cv: newCV,
    });
  } catch (error) {
    console.error('Error creating new CV:', error);
    res.status(500).json({ message: 'Server error' });
  }

}

// This function retrieves a specific CV by its ID and the user's username.
export const getCVByID = async (req, res) => {
  const { username, cvId } = req.params;
  console.log('Fetch CV request for:', username, cvId);

  try {
    // Step 1: Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Step 2: Find CV by id and user association
    const cv = await CV.findOne({ _id: cvId, user_id: user._id });
    if (!cv) return res.status(404).json({ message: 'CV not found' });

    // Step 3: Return single CV
    res.json({ success: true, cv });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
