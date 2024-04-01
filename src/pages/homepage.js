import React, { useEffect, useState } from "react";
import "../assets/styles/homepage.css";
import { Layout, Image, Row, Col, Input, Avatar, Pagination, Spin } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { bookTitles } from "../utils/data";
import BogormLogo from "../assets/icons/bogorm_logo_transparent.png";
import BookCard from "../components/bookCard";
import { getBookOnlineApi } from "../api/bookApi";
import { UserAtom } from "../utils/store";
import { useRecoilValue } from "recoil";
import { getUserBooksApi } from "../api/userBookApi";

const { Header, Content } = Layout;
const { Search } = Input;

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
    handleSearchBook(searchBook, page, pageSize);
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    setLoader(true);
    getUserBooksApi(userData._id).then((res) => {
      setLoader(false);
      setUserBooks(res.data);
    });
  }, []);

  return (
    <Layout id="homepage-layout">
      <Header id="header">
        <div className="bogorm-logo">
          <Image id="bogorm" src={BogormLogo} preview={false} width={125} />
        </div>
        <Search
          placeholder="Search Books"
          enterButton={<SearchOutlined />}
          size="large"
          allowClear
          onPressEnter={(event) => {
            setLoader(true);
            handleSearchBook(event.target.value, currentPage, pageSize);
          }}
        />
        <Avatar className="user-icon" icon={<UserOutlined />} />
      </Header>
      <Content id="homepage-content">
        <div className="content-wrapper">
          <Row>
            <Col span={24}>
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
              {!loader && (
                <div className="mt-20 mb-20">
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
