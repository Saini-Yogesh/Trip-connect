const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const ProfileDetail = require("../models/profileDetail");
require("dotenv").config({ path: "../../.env" });

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const createToken = (email) => {
  const token = jwt.sign({ email }, secretKey, {
    expiresIn: "15m",
  });
  return token;
};

router.post("/api/user/signUp", async (req, res) => {
  const { email, password, name, dob, gender, username } = req.body;
  if (
    (gender !== "male" &&
      gender !== "female" &&
      gender !== "non-binary-other") ||
    !name ||
    !gender ||
    password.length < 8 ||
    !dob ||
    !username
  ) {
    return res.status(400).send({
      success: false,
      result: "Invalid credentials",
    });
  }
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .send({ success: false, result: "User already exists" });
    }

    existingUser = await ProfileDetail.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .send({ success: false, result: "Username already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = new User({ email, password: hashPassword });
    const profileDetail = new ProfileDetail({
      email,
      name,
      dob,
      gender,
      username,
      city: "",
      about: "",
      city: "",
      history: [],
      hobbiesOrProfession: "",
      experiences: "",
      links: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        youtube: "",
        website: "",
      },
    });

    await user.save();
    await profileDetail.save();
    const token = createToken(email);
    res.send({ success: true, token: token });
  } catch (error) {
    // If ProfileDetail save fails, delete the User document to roll back
    await User.deleteOne({ email });
    await ProfileDetail.deleteOne({ email });

    res.status(500).send({
      success: false,
      result: "Internal server error: " + error.message,
    });
  }
});

module.exports = router;
