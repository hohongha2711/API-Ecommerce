const express = require("express");
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getProductDetail,
  getProductList,
} = require("../controller/productCtrl");

const router = express.Router();

router.post("/add-product", createProduct)
router.delete("/delete-product/:id", deleteProduct)
router.put("/edit-product/:id", updateProduct)

module.exports = router;
