const express = require("express");
const app = express();
const adminController = require("../controllers/admin");

// //Register an admin
// app.post("/register", adminController.createAdmin);

//login as an admin
app.post("/login", adminController.loginAdmin);

module.exports = app;
