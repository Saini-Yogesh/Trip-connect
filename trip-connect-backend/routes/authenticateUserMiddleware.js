module.exports = async (req, res, next) => {
  const emailToken = req.headers["x-auth-token"]; // Token sent as header

  try {
    if (!emailToken) {
      return res
        .status(401)
        .json({ success: false, result: "No token provided" });
    }

    const user = await User.findOne({ email: emailToken });

    if (!user) {
      return res.status(401).json({ success: false, result: "Invalid token" });
    }

    req.user = user; // Attach user info to the request
    next(); // Continue to the next middleware/route handler
  } catch (err) {
    return res.status(500).json({ success: false, result: "Server error" });
  }
};
