import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, Image, Rate } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UserAtom } from "../utils/store";
import { useRecoilValue } from "recoil";
import { addBookApi } from "../api/bookApi";
import { addUserBookApi } from "../api/userBookApi";

const { Meta } = Card;

const BookCard = ({ bookDetails, searched }) => {
  // console.log("bookDetails: ", bookDetails);
  // console.log("searched: ", searched);

  const [loadingBook, setLoadingBook] = useState(true);
  const userData = useRecoilValue(UserAtom);
  const navigate = useNavigate();

  const handleCardClick = () => {
    // setIsModalVisible(true);
    navigate("/book", { state: { book: bookDetails } });
  };

  const handleAddBook = (book) => {
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
      console.log("newBook: ", newBook);
      addUserBookApi(userData._id, newBook.data.book._id).then((res) => {
        console.log("userId: ", userData._id);
        console.log("bookId: ", res._id);
        console.log("Added Book: ", newBook);
        console.log("Added UserBook: ", res);
      });
    });
  };

  return (
    <>
      <Card
        // loading={loadingBook}
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
                  key="add"
                  onClick={(event) => {
                    event.preventDefault();
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
        {/* <Rate
          allowHalf
          allowClear
          disabled
          defaultValue={bookDetails && bookDetails.averageRating}
          className="mt-10"
        /> */}
      </Card>
    </>
  );
};

export default BookCard;
