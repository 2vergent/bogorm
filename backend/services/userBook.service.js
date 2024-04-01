const { ObjectId } = require("mongodb");
const { UserBook } = require("../models/");

const addBookToUser = async (userId, bookId) => {
  const userBook = await UserBook.create({ user: userId, book: bookId });
  return userBook;
};

const getUserBooks = async (userId) => {
  return await UserBook.aggregate([
    {
      $match: { user: new ObjectId(userId) },
    },
    {
      $lookup: {
        from: "Books",
        localField: "book",
        foreignField: "_id",
        as: "bookDetails",
      },
    },
    {
      $unwind: "$bookDetails",
    },
    {
      $project: {
        _id: 0,
        dateAdded: 1,
        book: "$bookDetails",
      },
    },
  ]);
};

module.exports = { addBookToUser, getUserBooks };
