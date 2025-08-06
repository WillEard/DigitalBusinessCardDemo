import userModel from '../models/userModel.js';
// Removed unused isAuthenticated import

const getUserData = async (req, res) => { 
    try {
         const {userId} = req.body;

         const user = await userModel.findById(userId);

         if (!user){
            return res.json({success: false, message: "User not found"});
         }

         res.json({success: true, userData: {
            name: user.name,
            username: user.username,
            isVerified: user.isVerified,
            email: user.email,
            phoneNumber: user.phoneNumber,
            subscriptionType: user.subscriptionType,
            role: user.role,
            showMobile: user.showMobile
         }});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const updateUserSettings = async (req, res) => {
    try {
      // userAuth middleware injects userId into req.body
      const userId = req.body.userId;
      if (!userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
  
      // Copy body and remove userId so we won't accidentally try to set it
      const incoming = { ...req.body };
      delete incoming.userId;
  
      // Whitelist allowed fields to update
      const allowedFields = [
        'subscriptionType',
        'showMobile', // <-- ensure this is present
        // add other fields you want to allow users to update
      ];
  
      // Build updates only from allowed fields
      const updates = {};
      for (const key of allowedFields) {
        if (Object.prototype.hasOwnProperty.call(incoming, key)) {
          updates[key] = incoming[key];
        }
      }
  
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ success: false, message: 'No valid fields provided to update' });
      }
  
      // Apply the update and return the updated user
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true }
      ).select('-password');
  
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      return res.json({ success: true, data: updatedUser });
    } catch (error) {
      console.error('Error updating user settings:', error);
      return res.status(500).json({ success: false, message: error.message || 'Server error' });
    }
  };

export { getUserData };
