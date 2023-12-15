const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const showMe = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user, success: true });
};

module.exports = { showMe };
