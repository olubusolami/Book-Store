const express = require("express");
const app = express();

//404 error
app.use((req, res, next) => {
  res.status(404).json({
    message: "Ohh you are lost, tap back to find your way ASAP",
  });
});

module.exports = app;
