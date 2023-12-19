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

router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.put("/update/:id", updateProduct);
router.get("/:id", getProductDetail);
router.get("/", getProductList);
router.put("/rating", authMiddleware, addReview);

module.exports = router;
