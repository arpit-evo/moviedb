const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
const userRoutes = require("./src/routes/user.routes");
const movieRoutes = require("./src/routes/movie.routes");
const authenticateToken = require("./src/middlewares/auth.middleware");
const app = express();

const swaggerDocument = YAML.load(
  path.join(__dirname, "src", "docs", "swagger-bundle.yaml")
); //"./src/docs/swagger.yml";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/user/", userRoutes);
app.use("/api/movie/", authenticateToken, movieRoutes);

mongoose.connect("mongodb://localhost:27017/moviedb").then(() => {
  console.log("database connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT} `);
  });
});
