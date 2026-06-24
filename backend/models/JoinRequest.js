const mongoose = require("mongoose");

const joinRequestSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a user can only request to join a specific trip once
joinRequestSchema.index({ trip: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("JoinRequest", joinRequestSchema);
