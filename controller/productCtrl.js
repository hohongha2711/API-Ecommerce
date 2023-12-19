const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const slugify = require("slugify");
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const findProduct = await Product.findOne({
      slug: req.body.slug,
      color: req.body.color,
      brand: req.body.brand,
    });
    if (!findProduct) {
      const newProduct = await Product.create(req.body);
      res.json(newProduct);
    } else {
      throw new Error(`Product already exists in brand ${req.body.brand}`);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json({ deletedProduct });
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getProductList = asyncHandler(async (req, res) => {
  try {
    const { category, color, brand, sort } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (color) filter.color = color;
    if (brand) filter.brand = brand;
    let productList = Product.find(filter);
    if (sort) {
      const sortOptions = sort.split(":");
      const sortField = sortOptions[0];
      const sortOrder = sortOptions[1] === "desc" ? -1 : 1;
      productList = productList.sort({ [sortField]: sortOrder });
    }
    productList = await productList.exec();

    res.json(productList);
  } catch (error) {
    throw new Error(error);
  }
});

const getProductDetail = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const detailProduct = await Product.findById(id);
    res.json({ detailProduct });
  } catch (error) {
    throw new Error(error);
  }
});

const addReview = asyncHandler(async (req, res) => {
  console.log(req.user);
  const { _id } = req.user;
  const { star, productId, comment } = req.body;

  try {
    const product = await Product.findById(productId);
    let alreadyRated = product.ratings.review.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );

    if (alreadyRated) {
      const updateRating = await Product.findOneAndUpdate(
        {
          "ratings.review._id": alreadyRated._id,
        },
        {
          $set: {
            "ratings.review.$.star": star,
            "ratings.review.$.comment": comment,
          },
        },
        {
          new: true,
        }
      );
      const averageResult = await Product.aggregate([
        { $match: { _id: updateRating._id } },
        {
          $project: {
            average_star: { $avg: "$ratings.review.star" },
          },
        },
      ]);

      const result = await Product.findByIdAndUpdate(
        updateRating._id,
        { "ratings.average_star": averageResult[0].average_star },
        { new: true }
      );

      res.json(result);
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            "ratings.review": {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },

          $inc: {
            "ratings.total_rating": 1,
          },
        },
        {
          new: true,
        }
      );
      const averageResult = await Product.aggregate([
        { $match: { _id: rateProduct._id } },
        {
          $project: {
            average_star: { $avg: "$ratings.review.star" },
          },
        },
      ]);

      const result = await Product.findByIdAndUpdate(
        rateProduct._id,
        { "ratings.average_star": averageResult[0].average_star },
        { new: true }
      );

      res.json(result);
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProductDetail,
  getProductList,
  addReview,
};
