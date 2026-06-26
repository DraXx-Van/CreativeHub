const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema(
  {
    screenNumber: {
      type: Number,
      required: true,
    },

    formats: [
      {
        type: String,
        enum: ["2D", "3D", "IMAX"],
        required: true,
      },
    ],
  },
  { _id: false }
);

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    logo: {
      type: String,
      required: true,
    },

    minPrice: {
      type: Number,
      required: true,
    },

    maxPrice: {
      type: Number,
      required: true,
    },

    screens: [screenSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Theatre", theatreSchema);