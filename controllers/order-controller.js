const { User } = require("../models/user-model");
const Order = require("../models/Order-model");

exports.postOrder = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("cart.productId", "price qty title")
      .select("username cart address orders");
    const messagesValue = [];
    user.cart.map((product) => {
      if (product.quantity > product.productId.qty)
        messagesValue.push({
          Messages: `There is no enouch quantity of ${product.productId.title}`,
          Available: product.productId.qty,
        });
    });
    if (messagesValue.length == 0) {
      var totalPrice = 0;
      user.cart.map(async (cartItem) => {
        totalPrice = totalPrice + cartItem.productId.price * cartItem.quantity;
        cartItem.productId.qty = cartItem.productId.qty - cartItem.quantity
        await cartItem.productId.save();
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
      return res.json(uploadedOrder);
    } else {
      return res.json(messagesValue);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("orders", "products totalPrice address status")
      .select("username orders");
    const neededOrder = user.orders.filter((order) => {
      return order._id == req.params.orderId;
    });
    return res.status(201).send(neededOrder);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("orders", "products totalPrice address status")
      .select("username orders");
    return res.status(201).send(user);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
