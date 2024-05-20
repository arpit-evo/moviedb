const express = require("express")
const { register, signIn } = require("../controllers/auth.controller")

const router = express.Router()

router.post("/register",register)
router.post("/login",signIn)

module.exports = router