exports.errorHandler = (req, res, next) => {
  if (req.body.title) {
    return res.status(400).json({
      status: "error",
      message: "Book title already exist, please add another",
    });
  }
  return next();
};
exports.errorHandler;
