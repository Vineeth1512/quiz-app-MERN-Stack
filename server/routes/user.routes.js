const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/signup", userController.register);
router.post("/login", userController.login);
router.post("/forgetPassword", userController.forgetPassword);
router.post("/resetPassword", userController.resetPassword);

module.exports = router;
