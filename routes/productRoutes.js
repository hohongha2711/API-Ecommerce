const express = require("express");
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getProductDetail,
  getProductList,
  addReview,
} = require("../controller/productCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add-product", createProduct)
router.delete("/delete-product/:id", deleteProduct)
router.put("/update-product/:id", updateProduct)
router.get("/detail-product/:id", getProductDetail)
router.get("/all-product", getProductList)
router.put("/rating", authMiddleware,addReview)


module.exports = router;
