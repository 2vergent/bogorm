const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const paginate = require("../models/plugins/paginate");
const { ObjectId } = require("mongodb");

const reviewSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: ObjectId,
    ref: "Book",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

reviewSchema.plugin(aggregatePaginate);
reviewSchema.plugin(paginate);
reviewSchema.index({ "$**": "text" });
const Review = mongoose.model("Reviews", reviewSchema, "Reviews");

module.exports = Review;
