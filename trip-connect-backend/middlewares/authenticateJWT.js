const jwt = require("jsonwebtoken");
const secretKey = "noNeedToChange";

const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from the Authorization header

  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized if no token is provided
  }
};

module.exports = authenticateJWT;
