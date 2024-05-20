const express = require("express")
require('dotenv').config();
const mongoose = require("mongoose")
const userRoutes = require("./src/routes/user.routes")
const movieRoutes = require("./src/routes/movie.routes");
const authenticateToken = require("./src/middlewares/auth.middleware");
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/user/",userRoutes)
app.use("/api/movie/",authenticateToken,movieRoutes)

mongoose.connect("mongodb://localhost:27017/moviedb").then(()=> {
  console.log("database connected");
  app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT} `)
  })
})
