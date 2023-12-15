const express = require("express");
const router = express.Router();

const { createRoom, getRoomMessage } = require("../controllers/roomController");

const { authenticateUser } = require("../middlewares/authentication");

router.route("/").post(authenticateUser, createRoom);
router.route("/:roomId").get(authenticateUser, getRoomMessage);

module.exports = router;
