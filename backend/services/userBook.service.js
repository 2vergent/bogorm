const { ObjectId } = require("mongodb");
const { UserBook } = require("../models/");

const addBookToUser = async (userId, bookId) => {
  const existingUserBook = await UserBook.findOne({
    user: userId,
    book: bookId,
  });

  if (!existingUserBook) {
    const userBook = await UserBook.create({ user: userId, book: bookId });
    return { success: true, message: "Book added successfully", userBook };
  } else {
    return { success: true, message: "Book already exists", existingUserBook };
  }
};

const getUserBooks = async (userId) => {
  return await UserBook.aggregate([
    {
      $match: { user: new ObjectId(userId) },
    },
    {
      $lookup: {
        from: "Books",
        localField: "book",
        foreignField: "_id",
        as: "bookDetails",
      },
    },
    {
      $unwind: "$bookDetails",
    },
    {
      $lookup: {
        from: "Reviews",
        localField: "book",
        foreignField: "book",
        as: "bookDetails.reviews",
      },
    },
    {
      $lookup: {
        from: "Users",
        localField: "bookDetails.reviews.user",
        foreignField: "_id",
        as: "reviewUsers",
      },
    },
    {
      $addFields: {
        "bookDetails.reviews": {
          $map: {
            input: "$bookDetails.reviews",
            as: "review",
            in: {
              $mergeObjects: [
                "$$review",
                {
                  username: {
                    $arrayElemAt: [
                      "$reviewUsers.username",
                      {
                        $indexOfArray: ["$reviewUsers._id", "$$review.user"],
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: "Comments",
        localField: "review",
        foreignField: "book",
        as: "bookDetails.comments",
      },
    },
    {
      $lookup: {
        from: "Users",
        localField: "bookDetails.comments.user",
        foreignField: "_id",
        as: "commentUsers",
      },
    },
    {
      $addFields: {
        "bookDetails.comments": {
          $map: {
            input: "$bookDetails.comments",
            as: "comment",
            in: {
              $mergeObjects: [
                "$$comment",
                {
                  username: {
                    $arrayElemAt: [
                      "$commentUsers.username",
                      {
                        $indexOfArray: ["$commentUsers._id", "$$comment.user"],
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        dateAdded: 1,
        book: "$bookDetails",
      },
    },
  ]);
};

// const getUserBooks = async (userId, options) => {
//   const userBookAggregate = [
//     { $match: { user: new ObjectId(userId) } },
//     {
//       $lookup: {
//         from: "Books",
//         localField: "book",
//         foreignField: "_id",
//         as: "bookDetails",
//       },
//     },
//     { $unwind: "$bookDetails" },
//     {
//       $lookup: {
//         from: "Reviews",
//         localField: "book",
//         foreignField: "book",
//         as: "bookDetails.reviews",
//       },
//     },
//     {
//       $lookup: {
//         from: "Users",
//         localField: "bookDetails.reviews.user",
//         foreignField: "_id",
//         as: "reviewUsers",
//       },
//     },
//     {
//       $addFields: {
//         "bookDetails.reviews": {
//           $map: {
//             input: "$bookDetails.reviews",
//             as: "review",
//             in: {
//               $mergeObjects: [
//                 "$$review",
//                 {
//                   username: {
//                     $arrayElemAt: [
//                       "$reviewUsers.username",
//                       {
//                         $indexOfArray: ["$reviewUsers._id", "$$review.user"],
//                       },
//                     ],
//                   },
//                 },
//               ],
//             },
//           },
//         },
//       },
//     },
//     {
//       $lookup: {
//         from: "Comments",
//         localField: "review",
//         foreignField: "book",
//         as: "bookDetails.comments",
//       },
//     },
//     {
//       $lookup: {
//         from: "Users",
//         localField: "bookDetails.comments.user",
//         foreignField: "_id",
//         as: "commentUsers",
//       },
//     },
//     {
//       $addFields: {
//         "bookDetails.comments": {
//           $map: {
//             input: "$bookDetails.comments",
//             as: "comment",
//             in: {
//               $mergeObjects: [
//                 "$$comment",
//                 {
//                   username: {
//                     $arrayElemAt: [
//                       "$commentUsers.username",
//                       {
//                         $indexOfArray: ["$commentUsers._id", "$$comment.user"],
//                       },
//                     ],
//                   },
//                 },
//               ],
//             },
//           },
//         },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         dateAdded: 1,
//         book: "$bookDetails",
//       },
//     },
//   ];

//   return await aggregatePaginate(userBookAggregate, options);
// };

module.exports = { addBookToUser, getUserBooks };
