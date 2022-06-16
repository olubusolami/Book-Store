const express = require("express");
const app = express();
const auth = require("../middleware/auth");
const bookController = require("../controllers/book");
const { errorHandler } = require("../middleware/errorHandler");

//POST request to /books to create a new book
app.post("/", auth, errorHandler, bookController.createBook);

//GET reqest to /books fetch all book
app.get("/", bookController.getBooks);

//GET request /book/:id to fetch a single book
app.get("/:id", bookController.getBookById);

//PUT request
app.put("/:id", auth, bookController.updateBookById);

module.exports = app;
