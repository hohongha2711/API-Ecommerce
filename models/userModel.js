const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcryptjs");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      unique: true,
      default:""
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },

    cart: {
      products: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
          count: Number,
          color: String,
          price: Number,
        },
      ],
      totalPrice: {  
        type: Number,
        default: 0
      },
    },
    refreshtoken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};
//Export the model
module.exports = mongoose.model("User", userSchema);
