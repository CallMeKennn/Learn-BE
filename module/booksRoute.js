import express from "express"
import booksController from "../controller/booksController.js"
const router = express.Router();

//Lấy danh sách tất cả sách
router.get("/", booksController.getAllBooks);

//Thêm sách mới
router.post("/", booksController.createBooks);

//Cập nhật thông tin sách theo Id
router.put("/:id", booksController.editBooks);

//Xóa sách theo id
router.delete("/:id", booksController.deleteBooks);

//Tìm sách theo từ khóa trong title.
router.get("/search", booksController.searchBooks);

export default router;
