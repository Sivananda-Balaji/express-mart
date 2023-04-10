const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/auth");
const { createProduct } = require("../controllers/product.controller");

const router = express.Router();

router.route("/").post([verifyToken, isAdmin], createProduct);

module.exports = router;
