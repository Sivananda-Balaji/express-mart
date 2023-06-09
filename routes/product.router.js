const express = require("express");
const { verifyToken } = require("../middleware/auth");
const {
  createProduct,
  getCategories,
  getProduct,
  updateProduct,
  deleteproduct,
  getProducts,
} = require("../controllers/product.controller");
const { isAdmin } = require("../middleware/authorize");

const router = express.Router();

router.route("/").post([verifyToken, isAdmin], createProduct).get(getProducts);
router.route("/categories").get(getCategories);
router
  .route("/:id")
  .get(getProduct)
  .put([verifyToken, isAdmin], updateProduct)
  .delete([verifyToken, isAdmin], deleteproduct);

module.exports = router;
