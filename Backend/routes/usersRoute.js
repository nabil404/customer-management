const express = require("express");
const router = express.Router();

//Import Controllers
const userController = require("../controllers/usersController");

router.post("/login", userController.login);

module.exports = router;
