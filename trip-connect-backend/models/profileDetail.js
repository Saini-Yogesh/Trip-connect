const mongoose = require("mongoose");

const profileDetailSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "non-binary-other"],
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  about: {
    type: String,
    trim: true,
  },
  hobbiesOrProfession: {
    type: String,
    trim: true,
  },
  history: [
    {
      description: { type: String, required: true, trim: true },
      date: { type: Date, default: Date.now },
    },
  ],
  experiences: {
    type: String,
    trim: true,
  },
  links: {
    facebook: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    youtube: { type: String, default: "" },
    website: { type: String, default: "" },
  },
});

module.exports = mongoose.model("profile_detail", profileDetailSchema);
