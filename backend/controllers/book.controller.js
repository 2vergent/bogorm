const { bookService } = require("../services");

const addBook = async (req, res) => {
  try {
    const {
      title,
      authors,
      publishedDate,
      publisher,
      pageCount,
      description,
      averageRating,
      categories,
    } = req.body;
    const bookData = {
      title,
      authors,
      publishedDate,
      publisher,
      pageCount,
      description,
      averageRating,
      categories,
    };
    const result = await bookService.addBook(bookData);
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getBookDetails = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const result = await bookService.getBookDetails(bookId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error fetching book details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const editBookDetails = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const updatedData = req.body;
    const result = await bookService.editBookDetails(bookId, updatedData);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error editing book details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  addBook,
  getBookDetails,
  editBookDetails,
};
