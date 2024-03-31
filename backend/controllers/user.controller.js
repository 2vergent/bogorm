const httpStatus = require("http-status");
const catchAsync = require("../utils/catch_async");
const userService = require("../services/user.service");

const userLogin = catchAsync(async (req, res) => {
  const login_user = await userService.userlogin(
    req.body.username,
    req.body.password
  );
  res.status(httpStatus.CREATED).send(login_user);
});

const userSignup = catchAsync(async (req, res) => {
  const signup_user = await userService.userSignup(
    req.body.name,
    req.body.username,
    req.body.password
  );
  res.status(httpStatus.CREATED).send(signup_user);
});

module.exports = { userLogin, userSignup };
