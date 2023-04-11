const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/auth");
const {
  createProduct,
  getCategories,
  getproduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.route("/").post([verifyToken, isAdmin], createProduct);
router.route("/categories").get(getCategories);
router.route("/:id").get(getproduct);

module.exports = router;
