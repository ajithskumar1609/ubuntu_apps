const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid path:${err.path}`;
  return new AppError(message, 400); // 400 Bad Request
};

const handleDuplicateFieldDB = (err) => {
  const message = `Duplicate Field value ${err.keyValue.name}`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const error = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input Data ${error}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) => {
  return new AppError("Invalid Token, Please log in", 401);
};
const handleExpireTokenError = (err) => {
  return new AppError("Your token was Expired!,Please log in again", 401);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  //operational Error //
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("Error", err);
    // programming Error // generic message
    res.status(500).json({
      status: "error",
      message: "Some thing Went Wrong",
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = err; // not hard copy
    console.log(error);
    if (error.path === "_id") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldDB(error);
    if (error._message === "Validation failed")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    if (error.name === "TokenExpiredError")
      error = handleExpireTokenError(error);
    sendErrorProd(error, res);
  }
};
