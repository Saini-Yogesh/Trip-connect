const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    maxMembers: {
      type: Number,
      required: true,
      min: 2,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual property to calculate vacancy/current count easily
tripSchema.virtual("currentMembersCount").get(function () {
  return this.members.length;
});

// Configure JSON serialization to include virtuals
tripSchema.set("toJSON", { virtuals: true });
tripSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Trip", tripSchema);
