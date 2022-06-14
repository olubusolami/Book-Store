const express = require("express");
const app = express();

//welcome note
app.get("/", (req, res) => {
  res.send("Hello and Welcome to your bookstore 🙌");
});
module.exports = app;
