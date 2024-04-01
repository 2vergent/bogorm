const express = require("express");
const userRoute = require("./user.route");
const booksRoute = require("./book.route");
const userBookRoute = require("./userBook.route");
const commentRoute = require("./comment.route");
const reviewRoute = require("./review.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/books",
    route: booksRoute,
  },
  {
    path: "/userbook",
    route: userBookRoute,
  },
  {
    path: "/comment",
    route: commentRoute,
  },
  {
    path: "/review",
    route: reviewRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
