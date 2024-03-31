const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const bookController = require("../controllers/book.controller");
const bookValidation = require("../validations/book.validation");

router
  .route("/")
  .post(validate(bookValidation.addBook), bookController.addBook);

router
  .route("/details/:bookId")
  .get(validate(bookValidation.getBookDetails), bookController.getBookDetails);

router
  .route("/details/:bookId")
  .put(
    validate(bookValidation.editBookDetails),
    bookController.editBookDetails
  );

module.exports = router;
