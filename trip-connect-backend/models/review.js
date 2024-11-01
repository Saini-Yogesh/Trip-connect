const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  review: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 500,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
