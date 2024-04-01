import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../assets/styles/homepage.css";
import {
  Row,
  Col,
  Image,
  Descriptions,
  Layout,
  Form,
  Input,
  Button,
  Rate,
} from "antd";
import { UserAtom } from "../utils/store";
import { useRecoilValue } from "recoil";
import BogormHeader from "../components/header";
import { addCommentApi } from "../api/commentApi";
import { addReviewApi } from "../api/reviewApi";

const { Content } = Layout;
const { TextArea } = Input;

const BookDetails = () => {
  const userData = useRecoilValue(UserAtom);
  const location = useLocation();
  const book = location.state.book;
  console.log("Book: ", book);
  const [reviewContent, setReviewContent] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [rating, setRating] = useState(0);

  const onReviewSubmit = async (reviewValues) => {
    reviewValues.user = userData._id;
    reviewValues.book = book._id;
    console.log("reviewValues: ", reviewValues);
    try {
      await addReviewApi(reviewValues);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      await addCommentApi(book._id, { content: commentContent });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const items = [
    {
      key: "1",
      label: "Title",
      children: book && book.title,
    },
    {
      key: "2",
      label: "Authors",
      children: book && book.authors && book.authors.join(", "),
    },
    {
      key: "3",
      label: "Published Date",
      children: book && book.publishedDate,
    },
    {
      key: "4",
      label: "Publisher",
      children: book && book.publisher,
    },
    {
      key: "5",
      label: "Pages",
      children: book && book.pageCount,
    },
    {
      key: "6",
      label: "Description",
      children: book && book.description,
    },
    {
      key: "7",
      label: "Average Rating",
      children: book && book.averageRating,
    },
    {
      key: "8",
      label: "Categories",
      children: book && book.categories && book.categories.join(", "),
    },
  ];

  return (
    <Layout id="homepage-layout">
      <BogormHeader />
      <Content id="homepage-content">
        <div className="content-wrapper">
          <Row type="flex" gutter={[0, 24]} align="top">
            <Col xs={24} sm={24} md={24} lg={8} xl={7} align="center">
              <Image
                alt={book && book.title}
                src={book && book.imageLinks && book.imageLinks.thumbnail}
                preview={false}
                width={290}
                height={420}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={16} xl={17} align="left">
              <Descriptions
                title="Book Details"
                layout="vertical"
                bordered
                column={{
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1,
                  xxl: 1,
                }}
                items={items}
              />
            </Col>
          </Row>
          <Row className="mt-20">
            <Col span={24}>
              <Form onFinish={onReviewSubmit}>
                <Form.Item label="Add Your Review" name="content">
                  <TextArea
                    rows={1}
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Rating"
                  name="rating"
                  rules={[
                    { required: true, message: "Please select a rating" },
                  ]}
                >
                  <Rate onChange={(value) => setRating(value)} />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Add Review
                </Button>
              </Form>
              <Form>
                <Form.Item label="Add Your Comment">
                  <TextArea
                    rows={1}
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={handleAddComment}>
                    Add Comment
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default BookDetails;
