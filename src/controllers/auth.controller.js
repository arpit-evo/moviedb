const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    throw new Error("email and password required");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({ email: email, password: hashPassword });
    await newUser.save();

    res.status(201).json({ message: "user created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  if (!email && !password) {
    throw new Error("email and password required");
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "invalid credential" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "invalid credential" });
    }

    const { accessToken, refreshToken } = generateToken(user, rememberMe);
    res.status(200).json({ message: "user login", accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "no refresh token provided" });
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET_KEY,
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden" });
      }
      const user = await User.findById({ _id: decoded.id });
      const { accessToken, newRefreshToken } = generateToken(user, true);
      res
        .status(200)
        .json({
          message: "refresh token successfully ",
          accessToken,
          newRefreshToken,
        });
    }
  );
};

module.exports = { register, signIn, refreshToken };
