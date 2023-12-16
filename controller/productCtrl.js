const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => { 
    console.log("create")
});

const deleteProduct = asyncHandler(async (req, res) => {});

const updateProduct = asyncHandler(async (req, res) => {});

const getProductList = asyncHandler(async (req, res) => {});

const getProductDetail = asyncHandler(async (req, res) => {});

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProductDetail,
  getProductList,
};
