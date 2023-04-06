const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../configs/auth.config");

const signUp = async (req, res) => {
  try {
    let { firstName, lastName, email, contactNumber, password } = req.body;
    const isEmailExists = await User.findOne({ email });
    if (isEmailExists) {
      return res.status(400).send({
        status: "Failed",
        message: "Try any other email, this email is already registered!",
      });
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({
        status: "Failed",
        message: "Invalid email-id format!",
      });
    }
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(contactNumber)) {
      return res.status(400).send({
        status: "Failed",
        message: "Invalid contact number!",
      });
    }
    password = await bcrypt.hash(password, 10);
    const userObj = { firstName, lastName, email, contactNumber, password };
    const newUser = await User.create(userObj);
    res.send({
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: "Failed",
      message: "Something went wrong!",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        status: "Failed",
        message: "This email has not been registered!",
      });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).send({
        status: "Failed",
        message: "Invalid Credentials!",
      });
    }
    const token = jwt.sign({ _id: user._id }, secret, { expiresIn: 5000 });
    const userRes = {
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      isAuthenticated: true,
    };
    res.header("x-auth-token", token).send(userRes);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: "Failed",
      message: "Something went wrong!",
    });
  }
};
module.exports = { signUp, signIn };
