const express = require("express");
const validate = require("../middlewares/validate");
const userValidation = require("../validations/user.validation");
const userController = require("../controllers/user.controller");
const router = express.Router();

router
  .route("/login")
  .post(validate(userValidation.userLogin), userController.userLogin);
router
  .route("/signup")
  .post(validate(userValidation.usersignup), userController.userSignup);

module.exports = router;
