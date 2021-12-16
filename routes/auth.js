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
  passport.authenticate("google", { failureRedirect: "/api/auth/getLogin" }),
  authController.googleRedirect
);
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    failureRedirect: "/api/auth/getLogin",
    failureFlash: true,
  }),
  authController.googleRedirect
);

module.exports = router;
