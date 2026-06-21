const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createBooking,
  getMyBookings,
  cancelBooking,
  getOccupiedSeats,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/create", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.delete("/:id/cancel", protect, cancelBooking);
router.get("/occupied-seats", getOccupiedSeats);

module.exports = router;
