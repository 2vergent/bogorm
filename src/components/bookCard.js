import React, { useState } from "react";
import "../assets/styles/bookcard.css";
import { useNavigate } from "react-router";
import { Card, Image, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UserAtom } from "../utils/store";
import { useRecoilValue } from "recoil";
import { addBookApi } from "../api/bookApi";
import { addUserBookApi } from "../api/userBookApi";

const { Meta } = Card;

const BookCard = ({ bookDetails, searched }) => {
  const [loadingBook, setLoadingBook] = useState(false);
  const userData = useRecoilValue(UserAtom);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/book", { state: { book: bookDetails } });
  };

  const handleAddBook = (book) => {
    setLoadingBook(true);
    addBookApi({
      title: book.title,
      authors: book.authors,
      publishedDate: book.publishedDate,
      publisher: book.publisher,
      pageCount: book.pageCount,
      description: book.description,
      averageRating: book.averageRating,
      categories: book.categories,
      imageLinks: { thumbnail: book.imageLinks.thumbnail },
    }).then((newBook) => {
      addUserBookApi(userData._id, newBook.data.book._id).then((res) => {
        setLoadingBook(false);
        if (res.data.message === "Book already exists") {
          message.warning("This book is already in your library");
        } else {
          message.success("Book added to your library");
        }
      });
    });
  };

  return (
    <>
      <Card
        loading={loadingBook}
        id="book-card"
        style={{ width: 190 }}
        hoverable
        size="small"
        onClick={handleCardClick}
        cover={
          bookDetails && (
            <Image
              alt={bookDetails.title}
              src={bookDetails.imageLinks && bookDetails.imageLinks.thumbnail}
              height={270}
              preview={false}
            />
          )
        }
        actions={
          searched
            ? [
                <PlusOutlined
                  className="add-book-icon"
                  key="add"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAddBook(bookDetails);
                  }}
                />,
              ]
            : []
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
      </Card>
    </>
  );
};

export default BookCard;
