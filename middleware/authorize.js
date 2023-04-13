const User = require("../models/user.model");

const isAdmin = async (req, res, next) => {
  try {
    const adminUser = await User.findOne({ _id: req._id });
    if (adminUser && adminUser.role === "ADMIN") {
      next();
    } else {
      return res.status(403).send({
        message: "You are not authorised to access this endpoint!",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "something went wrong",
    });
  }
};

const isUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req._id });
    if (user && user.role === "USER") {
      next();
    } else {
      return res.status(403).send({
        message: "You are not authorised to access this endpoint.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "something went wrong",
    });
  }
};

module.exports = { isUser, isAdmin };
