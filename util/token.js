const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const getToken = (id) => {
  return jwt.sign({ id: id }, process.env.SECRET);
};

module.exports = getToken;
