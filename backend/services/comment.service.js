const { Comment } = require("../models/");

const addComment = async (commentData) => {
  try {
    const comment = await Comment.create(commentData);
    return { success: true, comment };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { success: false, message: "Error adding comment" };
  }
};

const editComment = async (commentId, updatedData) => {
  try {
    const comment = await Comment.findByIdAndUpdate(commentId, updatedData, {
      new: true,
    });
    if (!comment) {
      return { success: false, message: "Comment not found" };
    }
    return { success: true, comment };
  } catch (error) {
    console.error("Error editing comment:", error);
    return { success: false, message: "Error editing comment" };
  }
};

module.exports = {
  addComment,
  editComment,
};
