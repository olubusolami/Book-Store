const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//register;
exports.createUser = async function (req, res) {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).json("User Already Exist. Please Login");

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.userToken = async function (req, res) {
  const token = await Token.findOne({ token: req.params.token });
  // token is not found into database i.e. token may have expired
  if (!token) {
    return res.status(400).send({
      msg: "token saved",
    });
  }
};

//login
exports.loginUser = async function (req, res) {
  //checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("Email is not found");

  //password check
  const validPass = await bcrypt.compareSync(req.body.password, user.password);
  if (!validPass) return res.status(400).json("invalid password");

  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  user.token = token;
  return res.status(200).json({ admin: user.email, token: token });
};

//borrow a book as a login user
exports.borrowBook = async function (req, res) {
  //checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("Email is not found");
  return res.status(200).json({ user: "welcome borrow a book" });
};
