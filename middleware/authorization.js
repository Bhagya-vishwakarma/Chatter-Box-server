const jwt = require("jsonwebtoken");
require('dotenv').config()

exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ "message": "No token provided" });
  } 

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ "message": "Invalid token" });
  }
};



