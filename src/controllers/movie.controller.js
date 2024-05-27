const Movie = require("../models/Movie");
const cloudinary = require("../middlewares/cloudinary.middleware");

const addMovie = async (req, res) => {
  try {
    const { title, publishingYear } = req.body;

    if (!title || !publishingYear || !req.file.path) {
      return res.status(500).json({ message: "provide valid information" });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    const movie = new Movie({
      title: title,
      publishingYear: publishingYear,
      imageUrl: result.url,
    });

    await movie.save();

    res.status(200).json({ message: "movie created", movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllMovies = async (req, res) => {
  const { search } = req.body;
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 8;
    let movies;
    if (search) {
      movies = await Movie.find({ $text: { $search: search } });
    } else {
      movies = await Movie.find()
        .skip((page - 1) * 8)
        .limit(limit);
    }

    res.status(200).json({ message: "all movies", movies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);

    res.status(200).json({ message: "movie fetched", movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findByIdAndDelete(id);

    res.status(204).json({ message: "movie deleted", movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;

  try {
    let movie = await Movie.findById(id);

    if (!movie) {
      return res.status(400).json({ message: "movie not found" });
    }
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const updatedData = {
      title: req.body.title || movie.title,
      publishingYear: req.body.publishingYear || movie.publishingYear,
      imageUrl: result ? result.url : movie.imageUrl,
    };

    movie = await Movie.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json({ message: "movie updated", movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addMovie,
  updateMovie,
  getAllMovies,
  getMovieById,
  deleteMovie,
};
