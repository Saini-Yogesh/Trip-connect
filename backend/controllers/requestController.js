const JoinRequest = require("../models/JoinRequest");
const Trip = require("../models/Trip");
const Conversation = require("../models/Conversation");

// @desc    Send request to join a trip
// @route   POST /api/trips/:id/request
// @access  Private
const sendJoinRequest = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    // Check if the user is the creator of the trip
    if (trip.createdBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: "You are the creator of this trip" });
    }

    // Check if already a member
    if (trip.members.includes(req.user._id)) {
      return res.status(400).json({ success: false, message: "You are already a member of this trip" });
    }

    // Check if trip is full
    if (trip.members.length >= trip.maxMembers) {
      return res.status(400).json({ success: false, message: "This trip has reached its maximum member limit" });
    }

    // Check if request already exists
    const existingRequest = await JoinRequest.findOne({
      trip: req.params.id,
      user: req.user._id,
    });

    if (existingRequest) {
      if (existingRequest.status === "pending") {
        return res.status(400).json({ success: false, message: "You have already sent a request which is pending" });
      } else if (existingRequest.status === "accepted") {
        return res.status(400).json({ success: false, message: "Your join request has already been accepted" });
      } else {
        // If rejected, let them request again by updating status to pending
        existingRequest.status = "pending";
        await existingRequest.save();
        return res.json({ success: true, message: "Join request resent successfully", request: existingRequest });
      }
    }

    // Create join request
    const request = await JoinRequest.create({
      trip: req.params.id,
      user: req.user._id,
    });

    res.status(201).json({ success: true, message: "Join request sent successfully", request });
  } catch (error) {
    console.error("Send Join Request Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Accept join request
// @route   PATCH /api/requests/:id/accept
// @access  Private
const acceptJoinRequest = async (req, res) => {
  try {
    const request = await JoinRequest.findById(req.params.id).populate("trip");

    if (!request) {
      return res.status(404).json({ success: false, message: "Join request not found" });
    }

    const trip = await Trip.findById(request.trip._id);

    // Verify ownership: only trip creator can accept
    if (trip.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to moderate requests for this trip" });
    }

    if (request.status === "accepted") {
      return res.status(400).json({ success: false, message: "Request already accepted" });
    }

    // Check if trip is full
    if (trip.members.length >= trip.maxMembers) {
      return res.status(400).json({ success: false, message: "Trip is already at maximum capacity" });
    }

    // Update request status
    request.status = "accepted";
    await request.save();

    // Add user to trip members
    if (!trip.members.includes(request.user)) {
      trip.members.push(request.user);
      await trip.save();
    }

    // Add user to conversation members
    const conversation = await Conversation.findOne({ trip: trip._id });
    if (conversation && !conversation.members.includes(request.user)) {
      conversation.members.push(request.user);
      await conversation.save();
    }

    res.json({ success: true, message: "Join request accepted successfully", request });
  } catch (error) {
    console.error("Accept Request Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reject join request
// @route   PATCH /api/requests/:id/reject
// @access  Private
const rejectJoinRequest = async (req, res) => {
  try {
    const request = await JoinRequest.findById(req.params.id).populate("trip");

    if (!request) {
      return res.status(404).json({ success: false, message: "Join request not found" });
    }

    const trip = await Trip.findById(request.trip._id);

    // Verify ownership: only trip creator can reject
    if (trip.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to moderate requests for this trip" });
    }

    if (request.status === "rejected") {
      return res.status(400).json({ success: false, message: "Request already rejected" });
    }

    // Update request status
    request.status = "rejected";
    await request.save();

    res.json({ success: true, message: "Join request rejected successfully", request });
  } catch (error) {
    console.error("Reject Request Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all requests for a trip
// @route   GET /api/trips/:id/requests
// @access  Private
const getTripRequests = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    // Only trip creator can view requests
    if (trip.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to view requests for this trip" });
    }

    const requests = await JoinRequest.find({ trip: req.params.id })
      .populate("user", "name email age gender city profileImage rating")
      .sort({ createdAt: -1 });

    res.json({ success: true, requests });
  } catch (error) {
    console.error("Get Trip Requests Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get the current user's request status for a specific trip
// @route   GET /api/trips/:id/my-request-status
// @access  Private
const getMyRequestStatus = async (req, res) => {
  try {
    const request = await JoinRequest.findOne({
      trip: req.params.id,
      user: req.user._id,
    });

    res.json({ success: true, request: request || null });
  } catch (error) {
    console.error("Get My Request Status Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all active trips the user has created or is joined in
// @route   GET /api/users/me/trips
// @access  Private
const getMyTrips = async (req, res) => {
  try {
    // Trips created by user
    const createdTrips = await Trip.find({ createdBy: req.user._id })
      .populate("createdBy", "name profileImage rating")
      .sort({ createdAt: -1 });

    // Trips user is a member of (excluding created ones)
    const joinedTrips = await Trip.find({
      members: req.user._id,
      createdBy: { $ne: req.user._id },
    })
      .populate("createdBy", "name profileImage rating")
      .sort({ createdAt: -1 });

    // Trips the user has requested to join (pending status)
    const requestedRequests = await JoinRequest.find({
      user: req.user._id,
      status: "pending",
    }).populate({
      path: "trip",
      populate: { path: "createdBy", select: "name profileImage rating" },
    });

    const requestedTrips = requestedRequests.map((req) => req.trip).filter(Boolean);

    res.json({
      success: true,
      created: createdTrips,
      joined: joinedTrips,
      requested: requestedTrips,
    });
  } catch (error) {
    console.error("Get My Trips Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  sendJoinRequest,
  acceptJoinRequest,
  rejectJoinRequest,
  getTripRequests,
  getMyRequestStatus,
  getMyTrips,
};
