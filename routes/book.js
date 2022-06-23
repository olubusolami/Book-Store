const express = require("express");
const app = express();
const auth = require("../middleware/auth");
const userAuth = require("../middleware/userAuth");
const bookController = require("../controllers/book");
const { errorHandler, bookHandler } = require("../middleware/errorHandler");

const userController = require("../controllers/user");

//POST request to /books to create a new book
app.post("/", auth, errorHandler, bookController.createBook);

//GET reqest to /books fetch all book
app.get("/", bookController.getBooks);

//GET request /book/:id to fetch a single book
app.get("/:id", bookController.getBookById);

//PUT request
app.put("/:id", auth, bookController.updateBookById);

//DELETE request
app.delete("/:id", auth, bookHandler, bookController.deleteBookById);

//borrow book
app.post("/borrow/:id", userAuth, bookHandler, userController.borrowBook);

module.exports = app;
