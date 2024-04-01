const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const paginate = require("../models/plugins/paginate");
const { ObjectId } = require("mongodb");

const commentSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  review: {
    type: ObjectId,
    ref: "Review",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.plugin(aggregatePaginate);
commentSchema.plugin(paginate);
commentSchema.index({ "$**": "text" });
const Comment = mongoose.model("Comments", commentSchema, "Comments");

module.exports = Comment;
