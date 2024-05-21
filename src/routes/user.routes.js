const express = require("express");
const {
  register,
  signIn,
  refreshToken,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", signIn);
router.post("/refresh-token", refreshToken);

module.exports = router;
