const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyparse = require("body-parser");
const flash = require("connect-flash");

const authRoutes = require("./routes/auth");
const sequelize = require("./database/database");
const intalizepassport = require("./util/passport");
const intalizefacebook = require("./util/facebook");
const getUser = require("./util/getUser");
const User = require("./model/user");
const { notFound, serverError } = require("./controller/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyparse.urlencoded({ extended: false }));

app.use(
  cookieSession({
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(getUser);

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);
app.use("/", notFound);
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.render("505");
});
const port = process.env.PORT || 5000;

(async function () {
  try {
    await sequelize.sync();

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
