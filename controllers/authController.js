const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const { attachCookiesToResponse } = require("../utils/jwt");

const register = async (req, res) => {
  const { phoneNumber, email, password, firstName, lastName } = req.body;
  const existingUser = await User.findOne({
    $or: [{ phoneNumber }, { email }],
  });
  if (existingUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Số điện thoại hoặc email đã được sử dụng.",
      success: false,
    });
  }
  const user = new User({ phoneNumber, email, password, firstName, lastName });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.status(StatusCodes.OK).json({ success: true });
};

const login = async (req, res) => {
  const { loginIdentifier, password } = req.body;
  const isPhoneNumber = /^\d+$/.test(loginIdentifier);
  let user;
  if (isPhoneNumber) {
    user = await User.findOne({ phoneNumber: loginIdentifier });
  } else {
    user = await User.findOne({ email: loginIdentifier });
  }
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Email hoặc số điện thoại chưa liên kết với tài khoản nào",
      success: false,
    });
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Sai mật khẩu", success: false });
  }
  attachCookiesToResponse({ res, user });
  res.status(StatusCodes.OK).json({ user: user, success: true });
};

const logout = async (req, res) => {
  res.cookie("access_token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!", success: true });
};

module.exports = { register, login, logout };
