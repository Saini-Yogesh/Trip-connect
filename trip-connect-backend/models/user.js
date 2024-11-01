const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
});

// Exclude password when converting to JSON
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password; // Remove password from the returned object
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);
