const jwt = require('jsonwebtoken');
require("dotenv").config()
const User = require("../models/User")


function authenticateToken(req, res, next) {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY,async (err, decoded) => {
    
    if (err) {
      console.log(err)
      return res.status(403).json({ error: 'Forbidden' });
    }

    const user = await User.findById({_id: decoded.id})

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
