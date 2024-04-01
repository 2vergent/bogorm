import { axiosInstance } from "../utils/common";

export const addUserBookApi = (user_id, book_id) => {
  return axiosInstance.post("/userbook", { userId: user_id, bookId: book_id });
};

export const getUserBooksApi = (userId, page, limit) => {
  return axiosInstance.get(`/userbook/${userId}?page=${page}&limit=${limit}`);
};
