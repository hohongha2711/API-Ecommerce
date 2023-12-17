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
} = require("../controller/userCtrl");
const router = express.Router();

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/login-admin", authMiddleware, isAdmin ,loginAdmin)
router.post("/logout", logout);
router.get("/refresh", handleRefreshToken)
router.get("/all-users", getAllUser);
router.get("/:id", authMiddleware, getUserById);
router.delete("/:id", authMiddleware, deleteUser);
router.put("/edit-user/:id", authMiddleware, updateUser);
router.put("/add-product-to-cart", authMiddleware, addToCart);
module.exports = router;
