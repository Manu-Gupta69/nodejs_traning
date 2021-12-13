const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
  const token = req.header("X-AUTH-TOKEN");
  if (!token) {
    res.status(401).json({ err: "Access denied no token provided" });
    return;
  }
  try {
    const decoded = jwt.verify(token, "mylongseceretestring");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ err: "Invalid token" });
  }
}

module.exports = isAuth;
