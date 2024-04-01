const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const userBookController = require("../controllers/userBook.controller");
const userBookValidation = require("../validations/userBook.validation");

router
  .route("/")
  .post(
    validate(userBookValidation.addUserBook),
    userBookController.addBookToUser
  );
router.route("/:userId").get(userBookController.getUserBooks);

module.exports = router;
