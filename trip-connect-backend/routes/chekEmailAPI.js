const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/api/user/check-email", async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .send({ success: false, result: "User already exists" });
  }
  return res.send({ success: true, result: "User not exists" });
});

module.exports = router;
