const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
});

// 2. Tạo model (Book sẽ map tới collection "books" trong DB)
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
