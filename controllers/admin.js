const adminModel = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ADD_ADMIN = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const admin = new adminModel({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    admin.id = admin._id;
    const response = await admin.save();
    return res.status(200).json({ status: "Admin created", response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const ADMIN_LOGIN = async (req, res) => {
  try {
    const admin = await adminModel.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(404).json({ message: "Bad authentication" });
    }
    bcrypt.compare(
      req.body.password,
      admin.password,
      (err, isPasswordMatch) => {
        if (!isPasswordMatch || err) {
          return res.status(404).json({ message: "Bad authentication" });
        }
        const token = jwt.sign(
          { email: admin.email, adminId: admin._id },
          process.env.JWT_SECRET_ADMIN,
          { expiresIn: "10 days" },
          { algorithm: "RS526" }
        );
        return res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const GET_ADMIN = async (req, res) => {
  try {
    const response = await adminModel.find();
    const sortedResponse = response.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
    return res.send({ admin: sortedResponse });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};
module.exports = {
  ADD_ADMIN,
  ADMIN_LOGIN,
  GET_ADMIN,
};
