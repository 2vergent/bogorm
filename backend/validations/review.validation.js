const Joi = require("joi");

const addReviewValidation = {
  body: Joi.object().keys({
    user: Joi.string().required(),
    book: Joi.string().required(),
    content: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
  }),
};

const editReviewValidation = {
  params: Joi.object().keys({
    reviewId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    content: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
  }),
};

module.exports = {
  addReviewValidation,
  editReviewValidation,
};
