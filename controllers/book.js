const Book = require("../model/book");

exports.createBook = async function (req, res) {
  const book = req.body;
  Book.create(
    {
      title: book.title,
      author: book.author,
      year: book.year,
      category: book.category,
      purchaseCount: book.purchaseCount,
      imageUrl: book.imageUrl,
      tags: book.tags,
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

//GET request /borrow/:id to borrow a single book
exports.borrowBookById = async (req, res) => {
  Book.findOneAndDelete(req.params.id, (err, book) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else if (!book) {
      return res.status(404).json({ message: "book not available" });
    } else {
      return res.status(200).json({ message: "book deleted successfully" });
    }
  });
};
