const mongoose = require("mongoose");
const joi = require("joi");
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);
const Schema = mongoose.Schema;
const User = mongoose.Schema(
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

// module.exports = mongoose.model("User", User);
const userSchema = mongoose.model("User", User);

function userValidation(user) {
  const schema = joi.object({
    username: joi.string().trim().max(255).required(),
    email: joi.string().trim().max(255).email().lowercase().required(),
    password: joiPassword.string().minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).trim().min(12).required(),
    address: joi.string().trim().max(255).required()
  });

  return schema.validate(user);
}

exports.validate = userValidation;
exports.User = userSchema;
