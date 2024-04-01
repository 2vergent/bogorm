const { Review } = require("../models/");

const addReview = async (reviewData) => {
  try {
    const review = await Review.create(reviewData);
    return { success: true, review };
  } catch (error) {
    console.error("Error adding review:", error);
    return { success: false, message: "Error adding review" };
  }
};

const editReview = async (reviewId, updatedData) => {
  try {
    const review = await Review.findByIdAndUpdate(reviewId, updatedData, {
      new: true,
    });
    if (!review) {
      return { success: false, message: "Review not found" };
    }
    return { success: true, review };
  } catch (error) {
    console.error("Error editing review:", error);
    return { success: false, message: "Error editing review" };
  }
};

module.exports = {
  addReview,
  editReview,
};
