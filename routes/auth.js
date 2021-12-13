const router = require("express").Router();
const authController = require("../controller/auth");
const isAuth = require("../middleware/isAuth");

router.post("/signup", authController.postSignup);
router.post("/login", authController.postLogin);
router.get("/table", isAuth, authController.getTable);

module.exports = router;
