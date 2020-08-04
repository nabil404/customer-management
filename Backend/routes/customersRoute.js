const express = require("express");
const router = express.Router();

//Import Controllers
const customerController = require("../controllers/customersController");

//Import Middleware
const isLoggedIn = require("../middlewares/isLoggedIn");

router.post("/", isLoggedIn, customerController.createCustomer);
router.get("/", isLoggedIn, customerController.getCustomers);

router.get("/:id", isLoggedIn, customerController.getCustomer);
router.patch("/:id", isLoggedIn, customerController.updateCustomer);
router.delete("/:id", isLoggedIn, customerController.deleteCustomer);

module.exports = router;
