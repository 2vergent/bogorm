import { axiosInstance } from "../utils/common";

export const addReviewApi = (reviewData) => {
  return axiosInstance.post("/review", reviewData);
};

export const editReviewApi = (reviewId, updatedData) => {
  return axiosInstance.put(`/review/${reviewId}`, updatedData);
};
