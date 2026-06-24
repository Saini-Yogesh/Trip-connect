const Trip = require("../models/Trip");
const Conversation = require("../models/Conversation");
const JoinRequest = require("../models/JoinRequest");
const Message = require("../models/Message");

// @desc    Create a new trip
// @route   POST /api/trips
// @access  Private
const createTrip = async (req, res) => {
  try {
    const { destination, startDate, endDate, budget, description, maxMembers } = req.body;

    if (!destination || !startDate || !endDate || !budget || !description || !maxMembers) {
      return res.status(400).json({ success: false, message: "Please fill in all fields" });
    }

    // Create the trip, adding the creator as the first member
    const trip = await Trip.create({
      destination,
      startDate,
      endDate,
      budget,
      description,
      maxMembers,
      createdBy: req.user._id,
      members: [req.user._id],
    });

    // Create the corresponding conversation for this trip
    await Conversation.create({
      trip: trip._id,
      members: [req.user._id],
    });

    res.status(201).json({ success: true, trip });
  } catch (error) {
    console.error("Create Trip Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all trips with search filters
// @route   GET /api/trips
// @access  Public
const getTrips = async (req, res) => {
  try {
    const { destination, maxBudget, startDate } = req.query;
    let query = {};

    if (destination) {
      query.destination = { $regex: destination, $options: "i" };
    }

    if (maxBudget) {
      query.budget = { $lte: Number(maxBudget) };
    }

    if (startDate) {
      query.startDate = { $gte: new Date(startDate) };
    }

    const trips = await Trip.find(query)
      .populate("createdBy", "name age gender city profileImage rating")
      .sort({ createdAt: -1 });

    res.json({ success: true, trips });
  } catch (error) {
    console.error("Get Trips Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get trip by ID
// @route   GET /api/trips/:id
// @access  Public
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate("createdBy", "name email age gender city profileImage rating bio travelInterests")
      .populate("members", "name email age gender city profileImage rating bio travelInterests");

    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    res.json({ success: true, trip });
  } catch (error) {
    console.error("Get Trip By ID Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a trip
// @route   PUT /api/trips/:id
// @access  Private
const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    // Verify ownership
    if (trip.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "You are not authorized to edit this trip" });
    }

    trip.destination = req.body.destination || trip.destination;
    trip.startDate = req.body.startDate || trip.startDate;
    trip.endDate = req.body.endDate || trip.endDate;
    trip.budget = req.body.budget !== undefined ? req.body.budget : trip.budget;
    trip.description = req.body.description || trip.description;
    trip.maxMembers = req.body.maxMembers !== undefined ? req.body.maxMembers : trip.maxMembers;

    // Check if new maxMembers is less than current members
    if (trip.maxMembers < trip.members.length) {
      return res.status(400).json({
        success: false,
        message: `Max members cannot be less than current member count (${trip.members.length})`,
      });
    }

    const updatedTrip = await trip.save();
    res.json({ success: true, trip: updatedTrip });
  } catch (error) {
    console.error("Update Trip Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a trip
// @route   DELETE /api/trips/:id
// @access  Private
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    // Verify ownership
    if (trip.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "You are not authorized to delete this trip" });
    }

    // Delete trip from DB
    await Trip.findByIdAndDelete(req.params.id);

    // Delete associated JoinRequests, Conversation, and Messages
    await JoinRequest.deleteMany({ trip: req.params.id });
    const conversation = await Conversation.findOneAndDelete({ trip: req.params.id });
    if (conversation) {
      await Message.deleteMany({ conversation: conversation._id });
    }

    res.json({ success: true, message: "Trip and related data deleted successfully" });
  } catch (error) {
    console.error("Delete Trip Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
};
