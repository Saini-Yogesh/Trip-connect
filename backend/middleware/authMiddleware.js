const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token: "Bearer <token>" -> token is at index 1
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");

      // Find user and attach to request (excluding password)
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("Auth Token Error:", error.message);
      return res.status(401).json({ success: false, message: "Not authorized, token invalid or expired" });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token provided" });
  }
};

module.exports = { protect };
