const express = require("express");
const router = express.Router();
const contactUs = require("../models/contactUs");

router.post("/api/contactUs", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .send({ success: false, error: "All fields are required." });
  }

  if (name.length < 2) {
    return res
      .status(400)
      .send({ success: false, error: "Please enter a valid name." });
  }

  if (message.length < 10 || message.length > 500) {
    return res
      .status(400)
      .send({ success: false, error: "message must be 10-500 characters." });
  }

  const emailRegex = /.+@.+\..+/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .send({ success: false, error: "Please enter a valid email." });
  }

  const contactUsData = contactUs({ name, email, message });
  try {
    await contactUsData.save();
    return res.send({ success: true });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ success: false, error: "Error saving message: invalid data." });
    } else {
      return res
        .status(500)
        .send({ success: false, error: "Internal server error." });
    }
  }
});

module.exports = router;
