const mongoose = require("mongoose");

const showtimeSchema = new mongoose.Schema(
  {
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre",
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    screenNumber: {
      type: Number,
      required: true,
    },
    showDate: {
      type: String,
      required: true,
    },
    showTime: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      enum: ["2D", "3D", "IMAX"],
      required: true,
    },
    occupiedSeats: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Optional: Add a compound index to quickly find a specific showtime
showtimeSchema.index(
  { theatre: 1, movie: 1, screenNumber: 1, showDate: 1, showTime: 1 },
  { unique: true }
);

module.exports = mongoose.model("Showtime", showtimeSchema);
