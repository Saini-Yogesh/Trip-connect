const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const Trip = require("../models/Trip");

// @desc    Get message history for a trip conversation
// @route   GET /api/messages/:tripId
// @access  Private
const getMessagesByTripId = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    // Verify membership: only members of the trip can view message history
    if (!trip.members.includes(req.user._id)) {
      return res.status(403).json({ success: false, message: "Only approved trip members can view chat messages" });
    }

    const conversation = await Conversation.findOne({ trip: req.params.tripId });

    if (!conversation) {
      return res.json({ success: true, messages: [] });
    }

    const messages = await Message.find({ conversation: conversation._id })
      .populate("sender", "name profileImage rating")
      .sort({ createdAt: 1 });

    res.json({ success: true, messages });
  } catch (error) {
    console.error("Get Messages Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getMessagesByTripId,
};
