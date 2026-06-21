const mongoose = require("mongoose");

const castSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    poster: {
      type: String,
      required: true,
    },

    banner: {
      type: String,
      required: true,
    },

    genres: [
      {
        type: String,
      },
    ],

    rating: {
      type: Number,
      default: 0,
    },

    releaseDate: {
      type: Date,
      required: true,
    },

    ageRating: {
      type: String,
      default: "PG-13",
    },

    formats: [
      {
        type: String,
        enum: ["2D", "3D", "IMAX"],
      },
    ],

    cast: [castSchema],

    comingSoon: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);