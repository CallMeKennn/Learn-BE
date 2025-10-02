const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController");

router.post("/login", usersController.login);
router.post("/register", usersController.register);

module.exports = router;
