import React, { useState, useEffect } from "react";
import { Card, Image, Rate } from "antd";
import axios from "axios";

const { Meta } = Card;

const BookCard = ({ title }) => {
  const [bookDetails, setBookDetails] = useState(null);
  const [loadingBook, setLoadingBook] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${title}`
        );
        const book = response.data.items[0].volumeInfo;
        // console.log("Book details: ", book);
        setBookDetails(book);
        setLoadingBook(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [title]);

  return (
    <Card
      loading={loadingBook}
      style={{ width: 190 }}
      hoverable
      cover={
        bookDetails && (
          <Image
            alt={bookDetails.title}
            src={bookDetails.imageLinks && bookDetails.imageLinks.thumbnail}
            height={270}
          />
        )
      }
    >
      {bookDetails && (
        <Meta
          title={bookDetails.title}
          description={
            bookDetails.authors && (
              <div
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {bookDetails.authors[0]}
              </div>
            )
          }
        />
      )}
      <Rate
        allowHalf
        allowClear
        disabled
        defaultValue={bookDetails && bookDetails.averageRating}
        className="mt-10"
      />
    </Card>
  );
};

export default BookCard;
