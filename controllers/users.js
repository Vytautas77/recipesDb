const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*\d).{6,}$/;

const capitalizeWords = (input) => {
  return input.replace(/\b\w/g, (char) => char.toUpperCase());
};

const ADD_USER = async (req, res) => {
  try {
    if (req.body.password !== req.body.repeatPassword) {
      return res.status(400).json({
        status: "Password is not correct, repeat password or repeatPassword",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const repeatHash = bcrypt.hashSync(req.body.repeatPassword, salt);

    const userName = req.body.name;
    const userCorrectName = capitalizeWords(userName);
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ status: "Email is not correct" });
    }
    if (!passwordRegex.test(req.body.password)) {
      return res.status(400).json({ status: "Password is not correct" });
    }
    const user = new userModel({
      name: userCorrectName,
      email: req.body.email,
      password: hash,
      repeatPassword: repeatHash,
    });
    user.id = user._id;
    const response = await user.save();
    return res.status(200).json({ status: "User registered", response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const LOGIN_USER = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Bad authentication" });
    }
    bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
      if (!isPasswordMatch || err) {
        return res.status(404).json({ message: "Bad authentication" });
      }
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "2 days" },
        { algorithm: "RS256" }
      );
      return res.status(200).json(token);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const GET_USERS = async (req, res) => {
  try {
    const response = await userModel.find();
    const sortedUsers = response.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
    return res.send({ users: sortedUsers });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

module.exports = { ADD_USER, LOGIN_USER, GET_USERS };
