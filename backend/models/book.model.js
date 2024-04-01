const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const paginate = require("../models/plugins/paginate");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: Array },
  publishedDate: { type: String },
  publisher: { type: String },
  pageCount: { type: Number },
  description: { type: String },
  averageRating: { type: Number },
  categories: { type: Array },
  imageLinks: { type: Object },
});

bookSchema.plugin(aggregatePaginate);
bookSchema.plugin(paginate);
bookSchema.index({ "$**": "text" });
const Book = mongoose.model("Books", bookSchema, "Books");

module.exports = Book;
