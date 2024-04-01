const { reviewService } = require("../services");

const addReview = async (req, res) => {
  try {
    const reviewData = req.body;
    const result = await reviewService.addReview(reviewData);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const editReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const updatedData = req.body;
    const result = await reviewService.editReview(reviewId, updatedData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error editing review:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  addReview,
  editReview,
};
