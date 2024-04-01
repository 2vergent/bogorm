const Joi = require("joi");

const addUserBook = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    bookId: Joi.string().required(),
  }),
};

module.exports = { addUserBook };
