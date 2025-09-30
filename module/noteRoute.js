const express = require("express");
const router = express.Router();

let books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin" },
  { id: 2, title: "You Don't Know JS", author: "Kyle Simpson" },
  { id: 3, title: "The Pragmatic Programmer", author: "Andrew Hunt" },
];

//Lấy danh sách tất cả sách
router.get("/books", (req, res) => {
  res.status(200).json({ message: "Lấy danh sách thành công", results: books });
});

//Thêm sách mới
router.post("/books", (req, res) => {
  const { title, author } = req.body;
  books = [...books, { id: books.length + 1, title, author }];
  res
    .status(200)
    .json({ message: "Thêm sách mới thành công", results: newList });
});

//Cập nhật thông tin sách theo Id
router.put("/books/:id", (req, res) => {
  const bookID = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find((item) => item.id === bookID);
  books = [
    { ...book, author, title },
    ...books.filter((item) => item.id !== book.id),
  ];
  res
    .status(200)
    .json({ message: "Cập nhật sách  thành công", results: books });
});

//Xóa sách theo id
router.delete("/books/:id", (req, res) => {
  const bookID = parseInt(req.params.id);
  books = books.filter((item) => item.id !== bookID);
  res.status(200).json({ message: "Xóa sách khỏi danh sách thành công" });
});

//Tìm sách theo từ khóa trong title.
router.get("/books/search", (req, res) => {
  const keyword = req.query.keyword?.toLowerCase() || "";
  console.log(keyword);
  const filteredBooks = books.filter((book) => {
    const title = book.title?.toLowerCase() || "";
    const author = book.author?.toLowerCase() || "";
    return title.includes(keyword) || author.includes(keyword);
  });

  res.status(200).json({
    message: "Tìm sách thành công",
    results: filteredBooks,
  });
});

module.exports = router;
