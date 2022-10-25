const Cart = require("../models/cart-model");
const _ = require("lodash");

exports.postCart = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    const savedCart = await cart.save();
    res.status(200).send(savedCart);
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(201).send(updatedCart);
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndRemove(req.params.id);
    return res.status(201).send("Cart deleted !");
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
        userId : req.params.id
    });
    return res.status(201).send(cart);
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.getCarts = async (req, res) => {
  try {
    const carts = Cart.find() 
    return res.status(201).send(carts);
  } catch (err) {
    res.status(404).send(err);
  }
};
