const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const createUserToken = (user) => {
  return {
    userId: user._id,
    lastName: user.lastName,
    firstName: user.firstName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    image: user.image,
  };
};

const attachCookiesToResponse = ({ res, user }) => {
  const tokenPayload = createUserToken(user);
  const token = createJWT({ payload: tokenPayload });
  const expiresIn = process.env.JWT_LIFETIME || "1d";
  res.cookie("access_token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + expiresIn),
    secure: process.env.NODE_ENV === "production", // Chỉ sử dụng secure ở môi trường production
    signed: true,
  });
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { attachCookiesToResponse, isTokenValid };
