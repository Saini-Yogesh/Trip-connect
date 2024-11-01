const express = require("express");
const ProfileDetail = require("../models/profileDetail"); // Adjust the path as necessary
const router = express.Router();

const authenticateJWT = require("../middlewares/authenticateJWT");

router.put("/api/user/profile/:username", authenticateJWT, async (req, res) => {
  const { username } = req.params;
  const updatedData = { ...req.body };

  delete updatedData.email;
  delete updatedData.username;

  try {
    const updatedProfile = await ProfileDetail.findOneAndUpdate(
      { username: username },
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
