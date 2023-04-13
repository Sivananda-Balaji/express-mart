const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { createOrder } = require("../controllers/order.controller");
const { isUser } = require("../middleware/authorize");

const router = express.Router();

router.route("/").post([verifyToken, isUser], createOrder);

module.exports = router;
