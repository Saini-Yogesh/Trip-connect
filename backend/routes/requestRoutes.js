const express = require("express");
const router = express.Router();
const { acceptJoinRequest, rejectJoinRequest } = require("../controllers/requestController");
const { protect } = require("../middleware/authMiddleware");

router.patch("/:id/accept", protect, acceptJoinRequest);
router.patch("/:id/reject", protect, rejectJoinRequest);

module.exports = router;
