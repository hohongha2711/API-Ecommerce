const mongoose = require("mongoose");

var categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },

  slug: {
    type: String,
    lowercase: true,
    unique: true,
  },
});

module.exports = mongoose.model("Category", categorySchema)