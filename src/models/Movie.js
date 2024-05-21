const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  publishingYear: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
