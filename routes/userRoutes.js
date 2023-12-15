const express = require("express");
const router = express.Router();

const { showMe } = require("../controllers/userController");

const { authenticateUser } = require("../middlewares/authentication");

router.get("/showMe", authenticateUser, showMe);
module.exports = router;
