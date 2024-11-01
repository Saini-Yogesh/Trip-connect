const express = require("express");
const router = express.Router();
const ProfilDetails = require("../models/profileDetail");

router.post("/api/user/profileDetail", async (req, res) => {
  const { username, email } = req.body;
  const existingUser = await ProfilDetails.findOne({
    $or: [{ email }, { username }],
  });
  if (!existingUser) {
    return res.status(404).send({ success: false, result: "User Not found" });
  }
  return res.send({ success: true, result: existingUser });
});

module.exports = router;
