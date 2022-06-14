const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    purchaseCount: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Book", bookSchema);
