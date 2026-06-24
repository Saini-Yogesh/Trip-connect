const express = require("express");
const router = express.Router();
const { getMessagesByTripId } = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

router.get("/:tripId", protect, getMessagesByTripId);

module.exports = router;
