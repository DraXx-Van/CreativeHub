const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Showtime = require("../models/Showtime");

// @desc    Create a new booking with ACID Transactions
// @route   POST /api/bookings/create
// @access  Private
const createBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      movie,
      theatre,
      screenNumber,
      showDate,
      showTime,
      format,
      seats,
      totalPrice,
      paymentStatus,
    } = req.body;

    if (!seats || seats.length === 0) {
      throw new Error("No seats selected");
    }

    // 1. Find or create the Showtime document
    let showtime = await Showtime.findOne({
      theatre,
      movie,
      screenNumber,
      showDate,
      showTime,
    }).session(session);

    if (!showtime) {
      showtime = new Showtime({
        theatre,
        movie,
        screenNumber,
        showDate,
        showTime,
        format,
        occupiedSeats: [],
      });
      await showtime.save({ session });
    }

    // 2. Concurrency Control: Ensure none of the requested seats are already occupied
    const alreadyBooked = seats.some((seat) => showtime.occupiedSeats.includes(seat));
    if (alreadyBooked) {
      throw new Error("One or more seats have already been booked.");
    }

    // 3. Atomically add the seats to occupiedSeats
    // Using $nin ensures that even if two transactions check simultaneously, only one will succeed
    const updatedShowtime = await Showtime.findOneAndUpdate(
      { _id: showtime._id, occupiedSeats: { $nin: seats } },
      { $push: { occupiedSeats: { $each: seats } } },
      { new: true, session }
    );

    if (!updatedShowtime) {
      throw new Error("Seat reservation collision. Seats are no longer available.");
    }

    // 4. Create the actual Booking Record
    const booking = new Booking({
      user: req.user._id,
      movie,
      theatre,
      screenNumber,
      showDate,
      showTime,
      format,
      seats,
      ticketCount: seats.length,
      totalPrice,
      paymentStatus: paymentStatus || "paid",
      bookingStatus: "active",
    });

    await booking.save({ session });

    // 5. Commit the transaction (ACID Compliance)
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    // 6. Rollback if anything fails!
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({
      success: false,
      message: error.message || "Failed to create booking",
    });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("movie", "title banner")
      .populate("theatre", "name location")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.findById(req.params.id).session(session);

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      throw new Error("Not authorized to cancel this booking");
    }

    if (booking.bookingStatus === "cancelled") {
      throw new Error("Booking is already cancelled");
    }

    // 1. Release the seats from the Showtime
    const showtime = await Showtime.findOneAndUpdate(
      {
        theatre: booking.theatre,
        movie: booking.movie,
        screenNumber: booking.screenNumber,
        showDate: booking.showDate,
        showTime: booking.showTime,
      },
      {
        $pullAll: { occupiedSeats: booking.seats },
      },
      { new: true, session }
    );

    // 2. Mark booking as cancelled
    booking.bookingStatus = "cancelled";
    await booking.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get occupied seats for a specific show
// @route   GET /api/bookings/occupied-seats
// @access  Public
const getOccupiedSeats = async (req, res) => {
  try {
    const { theatre, movie, screenNumber, showDate, showTime } = req.query;

    const showtime = await Showtime.findOne({
      theatre,
      movie,
      screenNumber,
      showDate,
      showTime,
    });

    res.json({
      success: true,
      occupiedSeats: showtime ? showtime.occupiedSeats : [],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
  getOccupiedSeats,
};
