const router = require("express").Router();
const authController = require("../controller/auth");
const isAuth = require("../middleware/isAuth");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/table", isAuth, authController.table);

module.exports = router;
