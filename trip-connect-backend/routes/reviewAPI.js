const express = require("express");
const router = express.Router();
const Review = require("../models/review");

router.post("/api/review", async (req, res) => {
  const { name, email, review } = req.body;

  if (!name || !email || !review) {
    return res
      .status(400)
      .send({ success: false, error: "All fields are required." });
  }

  if (name.length < 2) {
    return res
      .status(400)
      .send({ success: false, error: "Please enter a valid name." });
  }

  if (review.length < 10 || review.length > 500) {
    return res
      .status(400)
      .send({ success: false, error: "Review must be 10-500 characters." });
  }

  const emailRegex = /.+@.+\..+/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .send({ success: false, error: "Please enter a valid email." });
  }

  const reviewData = Review({ name, email, review });
  try {
    await reviewData.save();
    return res.send({ success: true });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ success: false, error: "Error saving review: invalid data." });
    } else {
      return res
        .status(500)
        .send({ success: false, error: "Internal server error." });
    }
  }
});

module.exports = router;
