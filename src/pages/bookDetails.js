import React, { useEffect, useState } from "react";
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
  List,
  Avatar,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UserAtom } from "../utils/store";
import { useRecoilValue } from "recoil";
import BogormHeader from "../components/header";
import { addCommentApi } from "../api/commentApi";
import { addReviewApi } from "../api/reviewApi";
import { addBookApi } from "../api/bookApi";
import { addUserBookApi } from "../api/userBookApi";

const { Content } = Layout;
const { TextArea } = Input;

const BookDetails = () => {
  const userData = useRecoilValue(UserAtom);
  const location = useLocation();
  const [book, setBook] = useState(location.state.book);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    console.log("Book: ", book);
  }, [book]);

  const onReviewSubmit = async (reviewValues) => {
    reviewValues.user = userData._id;
    reviewValues.book = book._id;
    console.log("reviewValues: ", reviewValues);
    try {
      await addReviewApi(reviewValues).then((newReview) => {
        const updatedReview = {
          ...newReview.data.review,
          username: userData.username,
        };
        setBook((prevBook) => {
          const updatedBook = {
            ...prevBook,
            reviews: [...prevBook.reviews, updatedReview],
          };
          return updatedBook;
        });
      });
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleAddComment = async (review) => {
    const commentValues = {
      user: userData._id,
      review: review._id,
      content: commentContent,
    };
    console.log("commentValues: ", commentValues);
    try {
      await addCommentApi(commentValues).then((newComment) => {
        const updatedComment = {
          ...newComment.data.comment,
          username: userData.username,
        };
        setBook((prevBook) => {
          const updatedBook = {
            ...prevBook,
            comments: prevBook.comments
              ? [...prevBook.comments, updatedComment]
              : [updatedComment],
          };
          return updatedBook;
        });
      });
      setCommentContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
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
      addUserBookApi(userData._id, newBook.data.book._id).then((res) => {
        if (newBook.data.message === "Book already exists") {
          message.warning("This book is already in your library");
        } else {
          message.success("Book added to your library");
        }
      });
    });
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
      children: <Rate value={book && book.averageRating} disabled />,
    },
    {
      key: "8",
      label: "Categories",
      children: book && book.categories && book.categories.join(", "),
    },
  ];

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  return (
    <Layout id="homepage-layout">
      <BogormHeader />
      <Content id="homepage-content">
        <div className="content-wrapper">
          <Row type="flex" gutter={[0, 24]} align="top">
            <Col xs={24} sm={24} md={24} lg={8} xl={7} align="center">
              <Row type="flex">
                <Col span={24}>
                  <Image
                    alt={book && book.title}
                    src={book && book.imageLinks && book.imageLinks.thumbnail}
                    preview={false}
                    width={290}
                    height={420}
                  />
                </Col>
                <Col span={24} className="mt-20" align="center">
                  <Col span={17}>
                    <Button
                      type="primary"
                      shape="round"
                      style={{ width: "100%" }}
                      icon={<PlusOutlined />}
                      onClick={() => handleAddBook(book)}
                    >
                      Add to Library
                    </Button>
                  </Col>
                </Col>
              </Row>
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
          <div className="mt-30">
            <p style={{ textAlign: "left", fontWeight: 600, fontSize: 16 }}>
              Book Reviews
            </p>
            <List
              itemLayout="horizontal"
              bordered
              size="small"
              dataSource={book.reviews}
              renderItem={(review, index) => (
                <List.Item>
                  <List.Item.Meta
                    style={{ textAlign: "left" }}
                    avatar={
                      <Avatar
                        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                      />
                    }
                    title={
                      <span>
                        {`@${review.username}`}
                        <span className="ml-10">
                          <Rate value={review.rating} disabled allowHalf />
                        </span>
                      </span>
                    }
                    description={
                      <Row gutter={[0, 12]}>
                        <Col span={24}>
                          <span>{review.content}</span>
                        </Col>
                        {book &&
                          book.comments &&
                          book.comments.filter(
                            (comment) => comment.review === review._id
                          ).length !== 0 && (
                            <Col span={24}>
                              <List
                                itemLayout="horizontal"
                                bordered
                                size="small"
                                dataSource={book.comments.filter(
                                  (comment) => comment.review === review._id
                                )}
                                renderItem={(comment, index) => (
                                  <List.Item>
                                    <List.Item.Meta
                                      style={{ textAlign: "left" }}
                                      avatar={
                                        <Avatar
                                          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                                        />
                                      }
                                      title={
                                        <span>{`@${comment.username}`}</span>
                                      }
                                      description={
                                        <Row gutter={[0, 12]}>
                                          <Col span={24}>
                                            <span>{comment.content}</span>
                                          </Col>
                                        </Row>
                                      }
                                    />
                                  </List.Item>
                                )}
                              />
                            </Col>
                          )}
                        <Col span={24}>
                          <Row type="flex" gutter={[6, 0]}>
                            <Col xs={16} sm={19} md={20} lg={21} xl={22}>
                              <Input
                                onChange={(e) =>
                                  setCommentContent(e.target.value)
                                }
                                value={commentContent}
                                placeholder="Comments..."
                              />
                            </Col>
                            <Col
                              xs={8}
                              sm={5}
                              md={4}
                              lg={3}
                              xl={2}
                              align="right"
                            >
                              <Button
                                type="primary"
                                onClick={() => {
                                  handleAddComment(review);
                                }}
                                shape="round"
                                disabled={
                                  commentContent.length === 0 ? true : false
                                }
                              >
                                Comment
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
          <div className="review-form mt-20">
            <Row className="mt-20">
              <Col span={24}>
                <Form onFinish={onReviewSubmit}>
                  <Form.Item
                    {...formItemLayout}
                    label="Add Your Review"
                    name="content"
                    rules={[
                      {
                        required: true,
                        message: "Review content is required to post a review",
                      },
                    ]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Rating"
                    name="rating"
                    rules={[
                      {
                        required: true,
                        message: "Rating is required to post a review",
                      },
                    ]}
                  >
                    <Rate />
                  </Form.Item>
                  <Button type="primary" shape="round" htmlType="submit">
                    Post Review
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default BookDetails;
