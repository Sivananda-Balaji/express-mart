const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/auth");
const {
  createProduct,
  getCategories,
  getproduct,
  updateProduct,
  deleteproduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.route("/").post([verifyToken, isAdmin], createProduct);
router.route("/categories").get(getCategories);
router
  .route("/:id")
  .get(getproduct)
  .put([verifyToken, isAdmin], updateProduct)
  .delete([verifyToken, isAdmin], deleteproduct);

module.exports = router;
