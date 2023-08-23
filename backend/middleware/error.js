const ErrorHandler = require("../utils/errorhander");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";
  // wrong mongodb error
  if (err.name === "castError") {
    const message = `resource not found. invelid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // mogoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  // wrong JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invaiid, try again`;
    err = new ErrorHandler(message, 400);
  }
  // JWT expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json web Token is Expired, try again`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
