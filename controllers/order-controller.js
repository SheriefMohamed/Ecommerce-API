const User = require("../models/user-model");
const Order = require("../models/Order-model");
const _ = require("lodash");

exports.postOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("cart.productId", "price")
      .select("username cart address orders");
    var totalPrice = 0;
    user.cart.map((cartItem) => {
      totalPrice = totalPrice + cartItem.productId.price * cartItem.quantity;
    });
    const order = new Order({
      userId: user._id,
      products: [...user.cart],
      totalPrice: totalPrice,
      address: user.address,
    });
    const uploadedOrder = await order.save();
    user.orders.push(uploadedOrder);
    user.cart = [];
    await user.save();
    res.json(uploadedOrder);
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.getOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("orders", "products totalPrice address status")
      .select("username orders");
    const neededOrder = user.orders.filter(order => {
      return order._id == req.params.orderId
    })
    return res.status(201).send(neededOrder);
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("orders", "products totalPrice address status")
      .select("username orders");
    return res.status(201).send(user);
  } catch (err) {
    res.status(404).send(err);
  }
};
