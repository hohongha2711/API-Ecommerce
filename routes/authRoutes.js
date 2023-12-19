const express = require("express");
const {
  createUser,
  loginUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
  loginAdmin,
  handleRefreshToken,
  logout,
  addToCart,
  getCart,
  deleteProductInCart,
} = require("../controller/userCtrl");

const {
  createOrder,
  updateStatusOrder,
  getAllOrder,
  getAllOrderByUser,
  getOrderByID,
  getOrderByUserID,
  deleteOrder
} = require("../controller/orderCtrl");
const router = express.Router();

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/login-admin", authMiddleware, isAdmin, loginAdmin);
router.post("/logout", logout);
router.get("/refresh", handleRefreshToken);
router.get("/all-users", getAllUser);
router.get("/:id", authMiddleware, getUserById);
router.get("/cart/detail", authMiddleware, getCart);
router.delete("/cart/delete-product/:id", authMiddleware, deleteProductInCart);
router.delete("/:id", authMiddleware, deleteUser);
router.put("/edit-user/:id", authMiddleware, updateUser);
router.put("/add-product-to-cart", authMiddleware, addToCart);
router.post("/order", authMiddleware, createOrder);
router.put("/order/update-status/:id", authMiddleware, updateStatusOrder);
router.get("/order/get-all", authMiddleware, isAdmin, getAllOrder);
router.get("/order/get-all-by-user", authMiddleware, getAllOrderByUser);
router.get("/order/:id", authMiddleware, getOrderByID);
router.get(
  "/order/get-all-by-user/:id",
  authMiddleware,
  isAdmin,
  getOrderByUserID
);
router.delete("/delete-order/:id", authMiddleware, isAdmin, deleteOrder);

module.exports = router;
