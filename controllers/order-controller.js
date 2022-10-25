const Order = require("../models/Order-model");
const _ = require("lodash");

exports.postOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(200).send(savedOrder);
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(201).send(updatedOrder);
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndRemove(req.params.id);
    return res.status(201).send("Order deleted !");
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.find({
        userId : req.params.id
    });
    return res.status(201).send(order);
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = Order.find() 
    return res.status(201).send(orders);
  } catch (err) {
    res.status(404).send(err);
  }
};
