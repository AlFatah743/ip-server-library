const express = require("express");
const userController = require("../controllers/dataController.js");




const router = express.Router();

router.post("/register", dataController.register);
router.post("/login", dataController.login);

module.exports = router;