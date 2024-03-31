const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const paginate = require("../models/plugins/paginate");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(aggregatePaginate);
userSchema.plugin(paginate);
userSchema.index({ "$**": "text" });
const User = mongoose.model("User", userSchema, "User");

module.exports = User;
