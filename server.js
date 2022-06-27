const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const homeRoute = require("./routes/home");
const bookRoute = require("./routes/book");
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");

(async function db() {
  connection();
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

//Routes
app.get("/", homeRoute);
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/books", bookRoute);

//404 error
app.use((req, res, next) => {
  res.status(404).json({
    message: "Ohh you are lost, tap back to find your way ASAP",
  });
});

port = process.env.PORT || 4000;
app.listen(port, () => console.log("listening carefully"));
