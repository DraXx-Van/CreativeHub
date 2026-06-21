require("dotenv").config();
const mongoose = require("mongoose");

const Movie = require("../models/Movie");
const Theatre = require("../models/Theatre");

const movies = require("./movies");
const theatres = require("./theatres");

const connectDb = require("../config/db");

async function seedDatabase() {
  try {
    await connectDb();

    await Movie.deleteMany({});
    await Theatre.deleteMany({});

    console.log("Old data removed");

    await Movie.insertMany(movies);
    await Theatre.insertMany(theatres);

    console.log("Seed data inserted successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedDatabase();