import React from "react";
import "../assets/styles/homepage.css";
import { Layout, Image, Row, Col, Input, Avatar } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import BogormLogo from "../assets/icons/bogorm_logo_transparent.png";
import BookCard from "../components/bookCard";

const { Header, Content } = Layout;
const { Search } = Input;

const bookTitles = [
  "1984",
  "To Kill a Mockingbird",
  "The Great Gatsby",
  "Pride and Prejudice",
  "The Catcher in the Rye",
  "Harry Potter and the Sorcerer's Stone",
  "The Alchemist",
  "The Lord of the Rings",
  "The Hunger Games",
  "The Da Vinci Code",
  "The Alchemist",
  "The Road",
  "Gone Girl",
  "The Girl with the Dragon Tattoo",
  "The Kite Runner",
  "The Fault in Our Stars",
  "The Night Circus",
  "The Book Thief",
  "A Game of Thrones",
  "The Martian",
];

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
          <Row gutter={[48, 24]}>
            {bookTitles.map((book, index) => (
              <Col key={index} xs={12} sm={8} md={6} lg={4} xl={4}>
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
