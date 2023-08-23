const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    secure: false,
    httpOnly: false,
  };

  console.log("token ", options, token);

  res.cookie("token", token, options).json({
    success: true,
    user,
    token,
  });

  res.cookie("mytoken", token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    secure: false,
    httpOnly: false,
  });
};

module.exports = sendToken;
