const { Book } = require("../models");

const addBook = async (bookData) => {
  try {
    const book = await Book.create(bookData);
    return { success: true, message: "Book added successfully", book };
  } catch (error) {
    console.error("Error adding book:", error);
    return { success: false, message: "Error adding book" };
  }
};

const getBookDetails = async (bookId) => {
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return { success: false, message: "Book not found" };
    }
    return { success: true, book };
  } catch (error) {
    console.error("Error fetching book details:", error);
    return { success: false, message: "Error fetching book details" };
  }
};

const editBookDetails = async (bookId, updatedData) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, {
      new: true,
    });
    if (!updatedBook) {
      return { success: false, message: "Book not found" };
    }
    return {
      success: true,
      message: "Book details updated successfully",
      book: updatedBook,
    };
  } catch (error) {
    console.error("Error editing book details:", error);
    return { success: false, message: "Error editing book details" };
  }
};

module.exports = {
  addBook,
  getBookDetails,
  editBookDetails,
};
