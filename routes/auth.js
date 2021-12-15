const router = require("express").Router();
const authController = require("../controller/auth");
const isAuth = require("../middleware/isAuth");

const passport = require("passport");

router.post("/signup", authController.signup);
router.get("/signup", authController.getSignup);
router.post("/login", authController.login);
router.get("/table", isAuth, authController.table);
router.get("/login", authController.getLogin);
router.get("/logout", authController.logout);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authController.googleRedirect
);
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile", "email"] })
);

module.exports = router;
