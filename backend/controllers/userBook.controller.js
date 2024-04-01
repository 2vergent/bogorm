const { userBookService } = require("../services");

const addBookToUser = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    await userBookService.addBookToUser(userId, bookId);
    res.status(201).json({ message: "Book added to user successfully" });
  } catch (error) {
    console.error("Error adding book to user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserBooks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userBooks = await userBookService.getUserBooks(userId);
    res.status(200).json(userBooks);
  } catch (error) {
    console.error("Error fetching user books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addBookToUser, getUserBooks };
