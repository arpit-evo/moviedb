const bcrypt = require("bcryptjs")
require('dotenv').config();
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const register = async (req,res) => {
  const {email,password} = req.body
  if (!email && !password) {
    throw new Error("email and password required")
  }
  const hashPassword = await bcrypt.hash(password,10)
  try {
    const newUser = new User({email: email,password: hashPassword})
    await newUser.save()

    res.status(201).json({message: "user created"})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

const signIn = async (req,res)=> {
  const {email,password,rememberMe} = req.body

  if (!email && !password) {
    throw new Error("email and password required")
  }

  try {
    const user = await User.findOne({email: email})

    if(!user){
      return res.status(400).json({message: "invalid credential"})
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if (!isMatch) {
      return res.status(400).json({message: "invalid credential"})
    }

    const token = jwt.sign({id: user._id},process.env.JWT_SECRET_KEY,{expiresIn: rememberMe ? "7d" : "1h"})

    res.status(200).json({message: "user login",token})

  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = {register,signIn}