const express = require("express");
const {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.controller");
const upload = require("../middlewares/multer.middleware");

const router = express.Router();

router.post("/add", upload.single("file"), addMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.put("/update/:id", upload.single("file"), updateMovie);
router.delete("/delete/:id", deleteMovie);

module.exports = router;
