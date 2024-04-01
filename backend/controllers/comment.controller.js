const { commentService } = require("../services");

const addComment = async (req, res) => {
  try {
    const commentData = req.body;
    const result = await commentService.addComment(commentData);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const editComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const updatedData = req.body;
    const result = await commentService.editComment(commentId, updatedData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error editing comment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  addComment,
  editComment,
};
