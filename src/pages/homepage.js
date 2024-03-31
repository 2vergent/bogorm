import React from "react";
import "../assets/styles/homepage.css";
import { Layout, Image, Row, Col, Input, Avatar } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { bookTitles } from "../utils/data";
import BogormLogo from "../assets/icons/bogorm_logo_transparent.png";
import BookCard from "../components/bookCard";

const { Header, Content } = Layout;
const { Search } = Input;

const Homepage = () => {
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
        />
        <Avatar className="user-icon" icon={<UserOutlined />} />
      </Header>
      <Content id="homepage-content">
        <div className="content-wrapper">
          <Row gutter={[24, 24]}>
            {bookTitles.map((book, index) => (
              <Col
                key={index}
                xs={12}
                sm={12}
                md={8}
                lg={6}
                xl={4}
                align="center"
              >
                <BookCard key={index} title={`${book}`} />
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};
export default Homepage;
