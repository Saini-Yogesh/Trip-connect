const User = require("../models/User");

// @desc    Get user profile by ID
// @route   GET /api/users/:id
// @access  Public
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          age: user.age,
          gender: user.gender,
          city: user.city,
          bio: user.bio,
          profileImage: user.profileImage,
          travelInterests: user.travelInterests,
          rating: user.rating,
        },
      });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.age = req.body.age !== undefined ? req.body.age : user.age;
      user.gender = req.body.gender || user.gender;
      user.city = req.body.city || user.city;
      user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
      user.profileImage = req.body.profileImage !== undefined ? req.body.profileImage : user.profileImage;
      user.travelInterests = req.body.travelInterests !== undefined ? req.body.travelInterests : user.travelInterests;

      const updatedUser = await user.save();

      res.json({
        success: true,
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          age: updatedUser.age,
          gender: updatedUser.gender,
          city: updatedUser.city,
          bio: updatedUser.bio,
          profileImage: updatedUser.profileImage,
          travelInterests: updatedUser.travelInterests,
          rating: updatedUser.rating,
        },
      });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
