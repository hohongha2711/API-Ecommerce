const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  slug: {
    type: String,
    required: true,
    lowercase: true,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
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
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    require: true,
  },

  sold: {
    type: Number,
    require: true,
    default: 0,
  },

  ratings: {
    total_rating: {
      type: Number,
      default: 0,
    },
    average_star: {
      type: Number,
      default: 0,
      set: (value) => parseFloat(value.toFixed(1)),
    },
    review: [
      {
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
});
productSchema.index({ slug: 1, color: 1, brand: 1 }, { unique: true });
//Export the model
module.exports = mongoose.model("Product", productSchema);
