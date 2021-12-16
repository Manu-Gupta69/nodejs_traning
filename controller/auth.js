const { signupSchema, loginSchema } = require("../util/authSchema");
const User = require("../model/user");
const getToken = require("../util/token");

const bcrypt = require("bcryptjs");
const passport = require("passport");

const getSignup = (req, res, next) => {
  const message = req.flash("error")[0];

  res.render("signup", { error: message });
};

const signup = async (req, res, next) => {
  try {
    const data = req.body;
    await signupSchema.validateAsync(data);
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await User.create({
      username: data.username,
      name: data.name,
      email: data.email,
      password: hashedPassword,
      providerid: null,
    });

    req.session.userid = user.dataValues.id;
    res.redirect("/api/auth/signup");
  } catch (err) {
    if (err.hasOwnProperty("details")) {
      req.flash("error", err.details[0].message);
    }
    res.redirect("/api/auth/signup");
    return;
  }
};

const getLogin = (req, res, next) => {
  const message = req.flash("error")[0];

  if (req.user) {
    res.redirect("/api/auth/table");
    return;
  }

  res.render("login", { error: message });
};

const login = async (req, res, next) => {
  const data = req.body;

  try {
    await loginSchema.validateAsync(data);
    const user = await User.findOne({ where: { email: data.email } });

    if (user) {
      const result = await bcrypt.compare(
        data.password,
        user.dataValues.password
      );
      if (!result) {
        req.flash("error", "Invalid email or password");
        res.redirect("/login");
        return;
      }
      req.session.userid = user.dataValues.id;
      res.redirect("/api/auth/table");
      return;
    }
  } catch (err) {
    req.flash("error", "Invalid email or password");
    res.redirect("/api/auth/login");
  }
};

const table = async (req, res, next) => {
  try {
    const allUsers = await User.findAll();

    res.render("profile", { users: allUsers });
  } catch (err) {
    res.redirect("/");
  }
};

const logout = (req, res, next) => {
  req.session = null;
  res.redirect("/api/auth/login");
};

const googleRedirect = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/api/auth/login");
  res.redirect("/api/auth/table");
};

module.exports = {
  login,
  signup,
  table,
  getSignup,
  googleRedirect,
  getLogin,
  logout,
};
