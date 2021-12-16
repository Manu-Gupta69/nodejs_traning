const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

function isAuth(req, res, next) {
  if (!req.user) {
    res.redirect("/api/auth/login");
    return;
  }
  next();
}

module.exports = isAuth;
