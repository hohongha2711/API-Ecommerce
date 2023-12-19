const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      count: Number,
      color: String,
      price: Number,
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },

  sendAddress: { type: String, require: true },

  receiveAddress: { type: String, require: true },

  payment:{ 
    type: String,
    default: "COD"
  },

  paymentStatus:{ 
    type: String,
    default: "unpaid"
  },

  orderBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  status: {
    type: String,
    default: "Processing",
    enum: [
      "Delivering",
      "Processing",
      "Dispatched",
      "Cancelled",
      "Delivered",
      "Pendding",
    ],
  },

  dateOrdered: {
    type: Date,
    default: Date.now(),
  },
});

//Export the model
module.exports = mongoose.model("Order", orderSchema);
