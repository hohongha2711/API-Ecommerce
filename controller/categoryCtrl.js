const asyncHandler = require("express-async-handler");

const Category = require("../models/categoryModel");
const { error } = require("jquery");
const slugify = require("slugify");
const Product = require("../models/productModel");
const createCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }

    const findCate = await Category.findOne({ slug: req.body.slug });
    console.log(findCate);
    if (!findCate) {
      const newCate = await Category.create(req.body);
      res.json(newCate);
    } else {
      throw new Error("Category is already exists!");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCate = await Category.findByIdAndDelete(id);
    await Product.deleteMany({ category: id });
    res.json({ deletedCate });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createCategory, deleteCategory };
