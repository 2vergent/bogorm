import React, { useEffect, useState } from "react";
import "../assets/styles/homepage.css";
import { Layout, Row, Col, Pagination, Spin, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import BookCard from "../components/bookCard";
import { getBookOnlineApi } from "../api/bookApi";
import { UserAtom } from "../utils/store";
import { useRecoilValue } from "recoil";
import { getUserBooksApi } from "../api/userBookApi";
import BogormHeader from "../components/header";

const { Content } = Layout;

const Homepage = () => {
  const userData = useRecoilValue(UserAtom);
  const [userBooks, setUserBooks] = useState([]);
  const [searchBook, setSearchBook] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [loader, setLoader] = useState(false);

  const handleSearchBook = async (searchWord, page, size) => {
    console.log(searchWord);
    const startIndex = (page - 1) * size;
    getBookOnlineApi(searchWord, startIndex, size).then((res) => {
      console.log("Search Res: ", res);
      setSearchResponse(res);
      setLoader(false);
    });
    setSearchBook(searchWord);
  };

  const handlePageChange = (page, pageSize) => {
    setLoader(true);
    setSearchResponse([]);
    handleSearchBook(searchBook, page, pageSize);
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    setLoader(true);
    if (searchBook.length === 0) {
      getUserBooksApi(userData._id).then((res) => {
        setLoader(false);
        setUserBooks(res.data);
      });
    }
  }, [searchBook]);

  return (
    <Layout id="homepage-layout">
      <BogormHeader
        onSearch={(event) => {
          setLoader(true);
          handleSearchBook(event.target.value, currentPage, pageSize);
        }}
      />
      <Content id="homepage-content">
        <div className="content-wrapper">
          <Row>
            <Col span={24}>
              {!loader && searchBook.length === 0 && userBooks.length === 0 && (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span>
                      Your Library is empty. Search for books to add them to
                      your library.
                    </span>
                  }
                />
              )}
              {loader && (
                <Spin
                  className="loading-animation"
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 50,
                      }}
                      spin
                    />
                  }
                />
              )}
              {searchBook.length === 0 && (
                <Row gutter={[24, 24]}>
                  {userBooks &&
                    userBooks.map((userBook, index) => {
                      return (
                        <Col
                          key={index}
                          xs={12}
                          sm={12}
                          md={8}
                          lg={6}
                          xl={4}
                          align="center"
                        >
                          <BookCard
                            key={index}
                            bookDetails={userBook.book}
                            searched={false}
                          />
                        </Col>
                      );
                    })}
                </Row>
              )}
              {searchBook.length !== 0 && (
                <Row gutter={[24, 24]}>
                  {searchResponse &&
                    searchResponse.items &&
                    searchResponse.items.map((book, index) => {
                      return (
                        <Col
                          key={index}
                          xs={12}
                          sm={12}
                          md={8}
                          lg={6}
                          xl={4}
                          align="center"
                        >
                          <BookCard
                            key={index}
                            bookDetails={book.volumeInfo}
                            searched={true}
                          />
                        </Col>
                      );
                    })}
                </Row>
              )}
              {!loader &&
                searchBook.length !== 0 &&
                searchResponse.length !== 0 && (
                  <div className="mt-30 mb-10">
                    <Pagination
                      current={currentPage}
                      pageSize={pageSize}
                      total={searchResponse.totalItems}
                      onChange={handlePageChange}
                    />
                  </div>
                )}
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};
export default Homepage;
