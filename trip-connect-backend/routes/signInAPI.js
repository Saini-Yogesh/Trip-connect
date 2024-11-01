const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const secretKey = "noNeedToChange";

const createToken = (email) => {
  const token = jwt.sign({ email }, secretKey, {
    expiresIn: "15m",
  });
  return token;
};

router.post("/api/user/signIn", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      success: false,
      result: "Invalid credentials",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, result: "User doesn't exist" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ success: false, result: "Invalid password" });
    }
    const token = createToken(email);
    res.send({ success: true, token: token });
  } catch {
    res.send({ success: false, result: "Some error occurred in finding user" });
  }
});

module.exports = router;
