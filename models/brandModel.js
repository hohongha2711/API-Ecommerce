const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },

    location: {
      number: { type: String },
      street: { type: String },
      ward: { type: String, require: true },
      district: { type: String, require: true },
      province: { type: String, require: true },
    },

    slugs: {
      slugName: {
        type: String,
        required: true,
        lowercase: true,
      },
      slugDistrict: {
        type: String,
        required: true,
        lowercase: true,
      },
      slugProvince: {
        type: String,
        required: true,
        lowercase: true,
      },
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
