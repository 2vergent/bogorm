import React from "react";
import { Modal, Button, Row, Col, Image, Descriptions } from "antd";

const BookDetails = ({ book, visible, onClose }) => {
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
    <Modal
      title={book && book.title}
      open={visible}
      centered
      width={850}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <Row type="flex" align="middle">
        <Col span={6}>
          <Image
            alt={book && book.title}
            src={book && book.imageLinks && book.imageLinks.thumbnail}
          />
        </Col>
        <Col span={18}>
          <Descriptions
            title="Book Details"
            layout="vertical"
            bordered
            items={items}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default BookDetails;
