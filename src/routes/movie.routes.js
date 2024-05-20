const express = require("express")
const { addMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } = require("../controllers/movie.controller")
const upload = require("../middlewares/multer.middleware");

const router = express.Router()

router.post("/add",upload.single("image"),addMovie)
router.get("/",getAllMovies)
router.get("/:id",getMovieById)
router.put("/:id",upload.single("image"),updateMovie)
router.delete("/:id",deleteMovie)

module.exports = router