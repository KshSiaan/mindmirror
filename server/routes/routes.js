const { Router } = require("express");
const authController = require("../controller/authController");

const router = Router();

router.get("/", authController.base);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/checkuser", authController.checkuser);
module.exports = router;
