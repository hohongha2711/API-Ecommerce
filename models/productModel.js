const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sortdescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    default: [],
  },

  price: {
    type: String,
    required: true,
  },

  brand: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    require: true,
  },

  sold: {
    type: Number,
    require: true,
  },

  rate: {
    type: Number,
    require: true,
  },
});

//Export the model
module.exports = mongoose.model("Product", productSchema);
