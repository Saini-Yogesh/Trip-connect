const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./models/user.js");
const users = require("./roughData");
const ProfileDetail = require("./models/profileDetail.js"); // Import the ProfileDetail model
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../.env" });

app.use(express.json());
const port = 5000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});

const MONGODB_URI = process.env.MONGODB_URI;
// database connectivity
(async () => {
  await mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected with DB");
    })
    .catch((err) => {
      console.log("Error connecting to DB: ", err);
    });
})();

// Add multiple users and profile details
app.get("/api/user", async (req, res) => {
  try {
    const userPromises = users.map(async (userData) => {
      const { email, password, name, gender, dob, username } = userData;

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const user = new User({ email, password: hashPassword });
      await user.save();

      const profileDetail = new ProfileDetail({
        email,
        name,
        gender,
        dob,
        username,
        city: "",
        about: "",
        hobbiesOrProfession: "",
        history: [],
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
      await profileDetail.save();
    });
    await Promise.all(userPromises);
    res.send({
      success: true,
      result: "Users and profile details inserted successfully",
    });
  } catch (error) {
    console.error("Error inserting users and profile details:", error);
    res.status(500).send({ success: false, result: "Internal server error" });
  }
});
