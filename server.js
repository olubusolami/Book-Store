const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

(async function db() {
  await connection();
})();

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//middleware
app.use(express.json());

app.use((req, res, next) => {
  res.status(404).json({
    message: "Ohh you are lost, tap back to find your way ASAP",
  });
});

port = process.env.PORT || 4000;
app.listen(port, () => console.log("connected successfully"));
