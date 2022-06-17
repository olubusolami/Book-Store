const express = require("express");
const app = express();
const userController = require("../controllers/user");

//Register an user
app.post("/register", userController.createUser);

//login as an user
app.post("/login", userController.loginUser);

module.exports = app;
