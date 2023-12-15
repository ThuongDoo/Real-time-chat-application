const { isTokenValid } = require("../utils/jwt");
const { StatusCodes } = require("http-status-codes");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.access_token;
  if (!token) {
    const error = new Error("UNAUTHENTICATED");
    error.status = StatusCodes.UNAUTHORIZED;
    throw error;
  }
  req.user = isTokenValid({ token });
  next();
};

module.exports = { authenticateUser };
