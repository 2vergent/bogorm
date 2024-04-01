const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const paginate = require("../models/plugins/paginate");
const { ObjectId } = require("mongodb");

const userBookSchema = new mongoose.Schema({
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
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

userBookSchema.plugin(aggregatePaginate);
userBookSchema.plugin(paginate);
userBookSchema.index({ "$**": "text" });
const UserBook = mongoose.model("UserBook", userBookSchema, "UserBook");

module.exports = UserBook;
