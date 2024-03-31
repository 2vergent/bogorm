import { axiosInstance } from "../utils/common";

export const addBookApi = (bookData) => {
  return axiosInstance.post("/books", bookData);
};

export const getAllUserBooksApi = (userId) => {
  return axiosInstance.get(`/books/${userId}`);
};

export const getBookDetailsApi = (bookId) => {
  return axiosInstance.get(`/books/details/${bookId}`);
};

export const editBookDetailsApi = (bookId, updatedData) => {
  return axiosInstance.put(`/books/details/${bookId}`, updatedData);
};

export const getBookOnlineApi = async (searchTerm, startIndex, maxResults) => {
  const queryParams = new URLSearchParams({
    q: searchTerm,
    startIndex: startIndex,
    maxResults: maxResults,
  });
  try {
    const response = await axiosInstance.get(
      `https://www.googleapis.com/books/v1/volumes?${queryParams}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    return { success: false, message: "Error fetching book details" };
  }
};
