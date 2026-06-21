const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const { getMovieById, getMovies } = require("../controllers/movieController");
const { wrapAsync } = require("../utils/wrapAsync");

router.get("/",wrapAsync(getMovies));

router.get("/:id",wrapAsync(getMovieById));

module.exports = router;