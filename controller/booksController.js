import Book from "../models/bookModel.js";

let books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin" },
  { id: 2, title: "You Don't Know JS", author: "Kyle Simpson" },
  { id: 3, title: "The Pragmatic Programmer", author: "Andrew Hunt" },
];

const booksController = {
  getAllBooks: async (req, res) => {
    const books = await Book.find();
    res.status(200).json(books);
  },

  createBooks: async (req, res) => {
    const { title, author } = req.body;
    const newBook = new Book({ title, author });
    await newBook.save();
    res.status(201).json(newBook);
  },

  editBooks: (req, res) => {
    const bookID = parseInt(req.params.id);
    const { title, author } = req.body;
    const book = books.find((item) => item.id === bookID);
    books = [
      { ...book, author, title },
      ...books.filter((item) => item.id !== book.id),
    ];
    res
      .status(200)
      .json({ message: "Cập nhật sách thành công", results: books });
  },

  deleteBooks: (req, res) => {
    const bookID = parseInt(req.params.id);
    books = books.filter((item) => item.id !== bookID);
    res.status(200).json({ message: "Xóa sách khỏi danh sách thành công" });
  },

  searchBooks: (req, res) => {
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
  },
};

export default booksController;
