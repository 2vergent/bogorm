const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const commentController = require("../controllers/comment.controller");
const commentValidation = require("../validations/comment.validation");

router
  .route("/")
  .post(
    validate(commentValidation.addCommentValidation),
    commentController.addComment
  );

router
  .route("/:commentId")
  .put(
    validate(commentValidation.editCommentValidation),
    commentController.editComment
  );

module.exports = router;
