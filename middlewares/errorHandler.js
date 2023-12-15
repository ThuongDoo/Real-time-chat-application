const createError = require("http-errors");
const errorHandler = (err, req, res, next) => {
  console.log(err.status);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
};

module.exports = errorHandler;
