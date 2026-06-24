const express = require("express");
const router = express.Router();
const {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} = require("../controllers/tripController");
const {
  sendJoinRequest,
  getTripRequests,
  getMyRequestStatus,
  getMyTrips,
} = require("../controllers/requestController");
const { protect } = require("../middleware/authMiddleware");

// General trips routes
router.route("/")
  .get(getTrips)
  .post(protect, createTrip);

// User's own trips dashboard
router.get("/my-trips", protect, getMyTrips);

// Specific trip detail, edit, delete
router.route("/:id")
  .get(getTripById)
  .put(protect, updateTrip)
  .delete(protect, deleteTrip);

// Join requests for specific trip
router.post("/:id/request", protect, sendJoinRequest);
router.get("/:id/requests", protect, getTripRequests);
router.get("/:id/my-request-status", protect, getMyRequestStatus);

module.exports = router;
