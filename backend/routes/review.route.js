const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const reviewController = require("../controllers/review.controller");
const reviewValidation = require("../validations/review.validation");

router
  .route("/")
  .post(
    validate(reviewValidation.addReviewValidation),
    reviewController.addReview
  );

router
  .route("/:reviewId")
  .put(
    validate(reviewValidation.editReviewValidation),
    reviewController.editReview
  );

module.exports = router;
