const router = require("express").Router();
const authController = require("../controller/auth");

router.post("/signup", authController.postSignup);
router.post("/login", authController.postLogin);
router.get("/table", authController.getTable);

module.exports = router;
