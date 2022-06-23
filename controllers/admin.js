const Admin = require("../model/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/auth");

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

exports.adminToken = async function (req, res) {
  const token = await token.findOne({ token: req.params.token });
  // token is not found into database i.e. token may have expired
  if (!token) {
    return res.status(400).send({
      msg: "not valid",
    });
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

  const { token, error } = await generateToken(admin);
  if (error) res.send(error);

  res.status(200).json({
    data: admin,
    token: adminToken,
  });
};
