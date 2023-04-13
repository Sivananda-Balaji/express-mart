const jwt = require("jsonwebtoken");
const { secret } = require("../configs/auth.config");

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

module.exports = { verifyToken };
