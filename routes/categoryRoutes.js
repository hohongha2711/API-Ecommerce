const express = require("express");

const { createCategory, deleteCategory } = require("../controller/categoryCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("", createCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
