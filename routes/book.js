const express = require("express");
const app = express();
const auth = require("../middleware/auth");
const bookController = require("../controllers/book");
const { errorHandler } = require("../middleware/errorHandler");

//POST request to /books to create a new book
app.post(
  "/",
  auth.verifyToken,
  auth.isAdmin,
  errorHandler,
  bookController.createBook
);

//GET reqest to /books fetch all book
app.get("/", bookController.getBooks);

//GET request /book/:id to fetch a single book
app.get("/:id", bookController.getBookById);

//PUT request
app.put("/:id", auth.verifyToken, auth.isAdmin, bookController.updateBookById);

//DELETE request
app.delete(
  "/:id",
  auth.verifyToken,
  auth.isAdmin,
  bookController.deleteBookById
);

//POST request borrow book
app.post(
  "/borrow/:id",
  auth.verifyToken,
  auth.isUser,
  bookController.borrowABook
);

module.exports = app;
