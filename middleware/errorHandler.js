const Books = require("../model/book");
const Admin = require("../model/admin");
const User = require("../model/user");
const auth = require("../middleware/auth");

exports.errorHandler = async (req, res, next) => {
  const book = await Books.findOne({ title: req.body.title });
  if (book) {
    return res.status(400).json({
      status: "error",
      message: "Book title already exist, please add another",
    });
  }
  return next();
};
