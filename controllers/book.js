const Book = require("../model/book");
const User = require("../model/user");
const authorization = require("../middleware/auth");

exports.createBook = async function (req, res) {
  const book = req.body;
  Book.create(
    {
      title: book.title,
      author: book.author,
      year: book.year,
      category: book.category,
      borrowed: book.borrowed,
      imageUrl: book.imageUrl,
      tags: book.tags,
      noOfBooks: book.noOfBooks,
    },
    (err, newBook) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else {
        return res.status(200).json({ message: "new book created", newBook });
      }
    }
  );
};

//GET reqest to /books fetch all book
exports.getBooks = async (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else {
      return res.status(200).json({ books });
    }
  });
};

//GET request /book/:id to fetch a single book
exports.getBookById = async (req, res) => {
  Book.findOne({ _id: req.params.id }, (err, book) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else if (!book) {
      return res.status(404).json({ message: "book was not found" });
    } else {
      return res.status(200).json({ book });
    }
  });
};

//PUT request
exports.updateBookById = async (req, res) => {
  Book.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      category: req.body.category,
    },
    (err, book) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else if (!book) {
        return res.status(404).json({ message: "Book not found" });
      } else {
        book.save((err, savedBook) => {
          if (err) {
            return res.status(400).json({ message: err });
          } else {
            return res
              .status(200)
              .json({ message: "book updated successfully" });
          }
        });
      }
    }
  );
};

//DELETE request /book/:id to fetch a single book
exports.deleteBookById = async (req, res) => {
  Book.findOneAndDelete(req.params.id, (err, book) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else if (!book) {
      return res.status(404).json({ message: "book was not found" });
    } else {
      return res.status(200).json({ message: "book deleted successfully" });
    }
  });
};

//borrow a book by count (id)
exports.borrowABook = async (req, res) => {
  const book = await Book.findOne(
    {
      _id: req.params.id,
    },
    (err, book) => {
      //check if server is reached or book title is available
      if (err)
        return res.status(500).json({ error: "An issue occured, Try again!" });
      if (!book)
        return res
          .status(404)
          .json({ error: "The book you want was not found" });

      //check if book is available to be borrowed
      if (book.noOfBooks == book.borrowed)
        return res
          .status(404)
          .json({ message: "Book not available to be borrowed at the moment" });

      book.borrowed += 1;
      book.save();
      return res.status(200).json({ message: "Borrowed Successfully" });
    }
  );
};
