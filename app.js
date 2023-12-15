require("dotenv").config();
require("express-async-errors");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/userRoutes");
const roomRouter = require("./routes/roomRoutes");
const authRouter = require("./routes/authRoutes");
const connectDB = require("./db/connect");
const errorHandler = require("./middlewares/errorhandler");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static(path.join(__dirname, "public")));

connectDB(process.env.MONGO_URL);

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/room", roomRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
