const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user, rememberMe) => {
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: rememberMe
        ? process.env.REFRESH_TOKEN_EXPIRY_LONG
        : process.env.REFRESH_TOKEN_EXPIRY_SHORT,
    }
  );

  return { accessToken, refreshToken };
};

module.exports = generateToken