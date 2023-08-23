const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  console.log("req", req);
  const { token } = req.cookies;
  console.log("token?", token);

  if (!token) {
    console.log("Token", token);

    return next(new ErrorHander("pleace login to access this resorce", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  console.log("id", decodedData.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log("role", req.user.role);

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
