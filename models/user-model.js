const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    orders : [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order'
      }
    ],
    resetToken: String,
    resetTokenExpiration: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
