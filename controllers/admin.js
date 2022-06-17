const Admin = require("../model/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//register;
exports.createAdmin = async function (req, res) {
  const emailExist = await Admin.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).json("Admin Already Exist. Please Login");

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create a new admin
  const admin = new Admin({
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedAdmin = await admin.save();
    res.json(admin);
  } catch (err) {
    res.status(400).json(err);
  }
};

//login
exports.loginAdmin = async function (req, res) {
  //checking if the email exists
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(400).json("Email is not found");

  //password check
  const validPass = await bcrypt.compareSync(req.body.password, admin.password);
  if (!validPass) return res.status(400).json("invalid password");

  //create and assign a token
  const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET);
  admin.token = token;
  return res.status(200).json({ admin: admin.email, token: token });
};
