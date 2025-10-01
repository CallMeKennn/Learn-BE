const express = require("express");
const router = express.Router();
const bookController = require("../controller/booksController");

//Lấy danh sách tất cả sách
router.get("/", bookController.getAllBooks);

//Thêm sách mới
router.post("/", bookController.createBooks);

//Cập nhật thông tin sách theo Id
router.put("/:id", bookController.editBooks);

//Xóa sách theo id
router.delete("/:id", bookController.deleteBooks);

//Tìm sách theo từ khóa trong title.
router.get("/search", bookController.searchBooks);

module.exports = router;
