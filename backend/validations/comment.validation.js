const Joi = require("joi");

const addCommentValidation = {
  body: Joi.object().keys({
    user: Joi.string().required(),
    review: Joi.string().required(),
    content: Joi.string().required(),
  }),
};

const editCommentValidation = {
  params: Joi.object().keys({
    commentId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    content: Joi.string().required(),
    rating: Joi.number().required(),
  }),
};

module.exports = {
  addCommentValidation,
  editCommentValidation,
};
