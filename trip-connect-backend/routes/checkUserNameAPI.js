const express = require("express");
const router = express.Router();
const ProfileDetail = require("../models/profileDetail");

router.post("/api/user/check-username", async (req, res) => {
  const { username } = req.body;
  const existingUser = await ProfileDetail.findOne({ username });
  if (existingUser) {
    return res
      .status(409)
      .send({ success: false, result: "username already exists" });
  }
  return res.send({ success: true, result: "username not exists" }); // True if available
});

module.exports = router;
