const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    publishingYear: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

movieSchema.index({ title: "text", publishingYear: "desc" });

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
