const express = require("express");
const router = express.Router();

const {wrapAsync} = require("../utils/wrapAsync");

const {
  getTheatres,
  getTheatreById,
} = require("../controllers/theatreController");

router.get("/", wrapAsync(getTheatres));

router.get("/:id", wrapAsync(getTheatreById));

module.exports = router;