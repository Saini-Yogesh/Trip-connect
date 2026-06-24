const Review = require("../models/Review");
const User = require("../models/User");
const Trip = require("../models/Trip");

// @desc    Create a review for a user on a trip
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  try {
    const { reviewedUserId, tripId, rating, comment } = req.body;
    const reviewerId = req.user._id;

    if (!reviewedUserId || !tripId || !rating || !comment) {
      return res.status(400).json({ success: false, message: "Please fill in all fields" });
    }

    if (reviewerId.toString() === reviewedUserId.toString()) {
      return res.status(400).json({ success: false, message: "You cannot review yourself" });
    }

    // Check if the trip exists
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    // Verify co-membership: both reviewer and reviewedUser must be members of the trip
    if (!trip.members.includes(reviewerId) || !trip.members.includes(reviewedUserId)) {
      return res.status(400).json({
        success: false,
        message: "You can only review users who traveled with you on the same trip",
      });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({
      reviewer: reviewerId,
      reviewedUser: reviewedUserId,
      trip: tripId,
    });

    if (existingReview) {
      return res.status(400).json({ success: false, message: "You have already reviewed this user for this trip" });
    }

    // Create review
    const review = await Review.create({
      reviewer: reviewerId,
      reviewedUser: reviewedUserId,
      trip: tripId,
      rating: Number(rating),
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.error("Create Review Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all reviews for a user
// @route   GET /api/reviews/:userId
// @access  Public
const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewedUser: req.params.userId })
      .populate("reviewer", "name profileImage rating")
      .populate("trip", "destination")
      .sort({ createdAt: -1 });

    res.json({ success: true, reviews });
  } catch (error) {
    console.error("Get User Reviews Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createReview,
  getUserReviews,
};
