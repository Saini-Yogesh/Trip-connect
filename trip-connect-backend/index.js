const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config({ path: "../.env" });

const signInAPI = require("./routes/signInAPI");
const signUpAPI = require("./routes/signUpAPI");
const checkEmailAPI = require("./routes/chekEmailAPI");
const reviewAPI = require("./routes/reviewAPI");
const contactUsAPI = require("./routes/contactUsAPI");
const profileDetailAPI = require("./routes/profileDetailAPI");
const checkUsernameAPI = require("./routes/checkUserNameAPI");
const updateProfileDetailsAPI = require("./routes/updateProfileDetailsAPI");
const updateHisteoryAPI = require("./routes/updateHisteoryAPI");

/*
CORS Policy: If your frontend and backend are hosted on different ports 
(e.g., frontend on localhost:3000 and backend on localhost:5000),
you might encounter Cross-Origin Resource Sharing (CORS) issues.
The backend must include CORS headers to allow requests from the frontend.

To enable CORS in Express, you can use the cors middleware:
 */
const cors = require("cors");
app.use(cors());

// parses incoming request bodies that are in JSON format
app.use(express.json());

const port = 5000;

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

// Start the server
app.listen(port, () => {
  console.log(`listining at http://localhost:${port}/`);
});

// signIn user
app.post("/api/user/signIn", signInAPI);

// check email is unique or not
app.post("/api/user/check-email", checkEmailAPI);

// check username is unique or not
app.post("/api/user/check-username", checkUsernameAPI);

// signUp user
app.post("/api/user/signUp", signUpAPI);

// profile detail
app.post("/api/user/profileDetail", profileDetailAPI);

// update profile detail
app.put("/api/user/profile/:username", updateProfileDetailsAPI);

// update/add histeoy
app.post("/api/user/profile/updateHistory", updateHisteoryAPI);

// review
app.post("/api/review", reviewAPI);

// contact us
app.post("/api/contactUs", contactUsAPI);

// for catch all route
app.use((req, res) => {
  res.status(404).send({ success: false, result: "Unauthorized route" });
});
