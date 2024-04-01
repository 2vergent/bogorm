const Joi = require("joi");

const addBook = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    authors: Joi.array(),
    publishedDate: Joi.string(),
    publisher: Joi.string(),
    pageCount: Joi.number().integer().min(0),
    description: Joi.string(),
    averageRating: Joi.number().min(0).max(5),
    categories: Joi.array(),
    imageLinks: Joi.object(),
  }),
};

const getBookDetails = {
  params: Joi.object().keys({
    bookId: Joi.string(),
  }),
};

const editBookDetails = {
  params: Joi.object().keys({
    bookId: Joi.string(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      authors: Joi.array(),
      publishedDate: Joi.string(),
      publisher: Joi.string(),
      pageCount: Joi.number().integer().min(0),
      description: Joi.string(),
      averageRating: Joi.number().min(0).max(5),
      categories: Joi.array(),
      imageLinks: Joi.object(),
    })
    .min(1),
};

module.exports = {
  addBook,
  getBookDetails,
  editBookDetails,
};
