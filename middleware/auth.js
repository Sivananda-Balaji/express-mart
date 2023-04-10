const jwt = require("jsonwebtoken");
const { secret } = require("../configs/auth.config");
const User = require("../models/user.model");

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).send({
      message: "Please login first to access this endpoint!",
    });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req._id = decoded._id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      message: "Invalid Login",
    });
  }
};

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

module.exports = { verifyToken, isAdmin };
