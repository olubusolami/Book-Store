const Books = require("../model/book");
const Admin = require("../model/admin");
const User = require("../model/user");

exports.errorHandler = (req, res, next) => {
  const book = Books.findOne({ title: req.body.title });
  if (book) {
    return res.status(400).json({
      status: "error",
      message: "Book title already exist, please add another",
    });
  }
  next();
};

exports.bookHandler = (req, res, next) => {
  const admin = Admin.findOne({ admin: admin.token });
  if (!admin) {
    return res.status(400).json({
      status: "error",
      message: "you are not an Admin",
    });
  }
  const user = User.findOne({ user: user.token });
  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "you are not an User",
    });
  }
  next();
};
