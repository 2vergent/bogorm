import { axiosInstance } from "../utils/common";

export const addCommentApi = (commentData) => {
  return axiosInstance.post("/comment", commentData);
};

export const editCommentApi = (commentId, updatedData) => {
  return axiosInstance.put(`/comment/${commentId}`, updatedData);
};
