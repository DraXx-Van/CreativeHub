const Movie = require("../models/Movie");

module.exports.getMovies = async (req,res) => {
    const movies = await Movie.find({});

    res.status(200).json({
        success: true,
        count: movies.length,
        result: movies,   
    });
};

module.exports.getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return res.status(404).json({
      success: false,
      message: "Movie not found",
    });
  }

  res.status(200).json({
    success: true,
    result: movie,
  });
};