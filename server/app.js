const express = require("express");
const cors = require("cors");
const movies = require("./routes/movieRoutes");
const theatres = require("./routes/theatreRoutes");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/movies", movies);
app.use("/api/theatres", theatres);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

module.exports = app;