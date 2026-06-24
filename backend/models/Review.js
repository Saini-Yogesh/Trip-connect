const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index: A user can review another user only once per trip
reviewSchema.index({ reviewer: 1, reviewedUser: 1, trip: 1 }, { unique: true });

// Static method to calculate and update average rating for User
reviewSchema.statics.calculateAverageRating = async function (userId) {
  const stats = await this.aggregate([
    {
      $match: { reviewedUser: userId },
    },
    {
      $group: {
        _id: "$reviewedUser",
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  const User = mongoose.model("User");
  if (stats.length > 0) {
    await User.findByIdAndUpdate(userId, {
      rating: parseFloat(stats[0].avgRating.toFixed(1)),
    });
  } else {
    await User.findByIdAndUpdate(userId, {
      rating: 5.0,
    });
  }
};

// Recalculate average rating after review is saved
reviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.reviewedUser);
});

module.exports = mongoose.model("Review", reviewSchema);
