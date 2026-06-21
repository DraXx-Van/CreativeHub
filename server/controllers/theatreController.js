const Theatre = require("../models/Theatre");

module.exports.getTheatres = async (req, res) => {
  const theatres = await Theatre.find({});

  res.status(200).json({
    success: true,
    count: theatres.length,
    result: theatres,
  });
};

module.exports.getTheatreById = async (req, res) => {
  const theatre = await Theatre.findById(req.params.id);

  if (!theatre) {
    return res.status(404).json({
      success: false,
      message: "Theatre not found",
    });
  }

  res.status(200).json({
    success: true,
    result: theatre,
  });
};