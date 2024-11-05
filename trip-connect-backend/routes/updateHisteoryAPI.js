const express = require("express");
const ProfileDetail = require("../models/profileDetail"); // Adjust the path as necessary
const router = express.Router();
const authenticateJWT = require("../middlewares/authenticateJWT");

router.post(
  "/api/user/profile/updateHistory",
  authenticateJWT,
  async (req, res) => {
    const { email, tourName } = req.body;
    if (!email || !tourName) {
      return res.status(400).json({
        message:
          "Email and history entry must be provided, with history as a non-empty string",
      });
    }

    try {
      // Convert the history string to an object with the required structure
      const historyEntry = { description: tourName, date: new Date() };

      // Update the user's history array based on email
      const updatedProfile = await ProfileDetail.findOneAndUpdate(
        { email },
        { $push: { history: historyEntry } },
        { new: true, runValidators: true }
      );

      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.status(200).json({
        message: "History updated successfully",
        profile: historyEntry,
      });
    } catch (error) {
      console.error("Error updating history:" + error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
