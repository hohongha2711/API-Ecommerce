const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already exists");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email: email });

  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = generateRefreshToken(findUser?._id);
    const updatedUser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshtoken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      role: findUser?.role,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Email or password is wrong!");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email: email });

  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = generateRefreshToken(findUser?._id);
    const updatedUser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshtoken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      role: findUser?.role,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Email or password is wrong!");
  }
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshtoken: refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate(
    { refreshtoken: refreshToken },
    {
      refreshtoken: "",
    },
    { new: true }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshtoken: refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getUser = await User.findById(id);
    res.json({ getUser });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.json({ deletedUser });
  } catch (error) {
    throw new Error(error);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      { new: true }
    );
    res.json({ updatedUser });
  } catch (error) {
    throw new Error(error);
  }
});

const addToCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { product, count } = req.body;

  try {
    const user = await User.findById(_id);
    let alreadyProduct = user.cart.products.find(
      (prod) => prod.product.toString() === product.toString()
    );

    let getProd = await Product.findById(product);
    if (alreadyProduct) {
      if (count === 0) {
        user.cart.products = user.cart.products.filter(
          (prod) => prod.product.toString() !== product.toString()
        );
      } else {
        alreadyProduct.count = count;
      }
    } else {
      user.cart.products.push({
        product: product,
        count: count,
        color: getProd.color,
        price: getProd.price,
      });
    }
    user.cart.totalPrice = calculateTotalPrice(user.cart.products);
    const updateCart = await user.save();
    res.json(updateCart);
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

const deleteProductInCart = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    user.cart.products = user.cart.products.filter(
      (prod) => prod.product.toString() !== id.toString()
    );
    user.cart.totalPrice = calculateTotalPrice(user.cart.products);
    const updateCart = await user.save();
    res.json(updateCart)
  } catch (error) {
    throw new Error(error);
  }
});

const getCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);
    res.json(user.cart);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
  handleRefreshToken,
  loginAdmin,
  logout,
  addToCart,
  getCart,
  deleteProductInCart
};
