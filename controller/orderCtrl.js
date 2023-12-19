const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    let objects = [];
    for (let i = 0; i < req.body.products.length; i++) {
      let object = {};
      let getProd = await Product.findById(req.body.products[i].product);
      object.product = req.body.products[i].product;
      object.count = req.body.products[i].count;
      object.color = getProd.color;
      object.price = getProd.price;
      objects.push(object);
    }
    let newOrder = await new Order({
      products: objects,
      totalPrice: calculateTotalPrice(objects),
      orderBy: _id,
      sendAddress: req.body.sendAddress,
      receiveAddress: req.body.receiveAddress,
    }).save();

    res.json({ message: "success", newOrder });
  } catch (error) {
    throw new Error(error);
  }
});

const calculateTotalPrice = (products) => {
  let totalPrice = 0;
  products.forEach((product) => {
    totalPrice += product.price * product.count;
  });
  return totalPrice;
};

const updateStatusOrder = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.json({ updated });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrder = asyncHandler(async (req, res) => {
  try {
    const getOrders = await Order.find();
    res.json(getOrders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrderByUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const getOrders = await Order.find({ orderBy: _id });
    res.json(getOrders);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderByID = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getOrder = await Order.findById(id);
    res.json(getOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderByUserID = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getOrder = await Order.find({ orderBy: id });
    res.json(getOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    res.json({ message: "delete success" }, { deletedOrder });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createOrder,
  updateStatusOrder,
  getAllOrder,
  getAllOrderByUser,
  getOrderByID,
  getOrderByUserID,
  deleteOrder,
};
