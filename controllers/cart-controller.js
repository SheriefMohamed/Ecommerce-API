const { User } = require('../models/user-model');

exports.getCart = async (req,res, next) => {
  try { 
    const user = await User.findById(req.user.id).populate('cart.productId', 'title image price').select('username cart');
    var totalPrice = 0;
    user.cart.map(cartItem => {
      if(cartItem.productId!=null){
        totalPrice = totalPrice + (cartItem.productId.price * cartItem.quantity);
      }
    })
    res.json({user,totalPrice});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.AddToCart = async (req,res, next) => {
  try {
    const user = await User.findById(req.user.id).select('username cart');
    if(user.cart.length == 0){
      user.cart.push({
        productId : req.params.productId,
      })
    } else {
      const productIndex = user.cart.findIndex(i => {
        return i.productId == req.params.productId;
      })
      if(productIndex == -1){
        user.cart.push({
          productId : req.params.productId,
        })
      } else {
        const cartIndexValue = user.cart.at(productIndex);
        user.cart.at(productIndex).quantity = cartIndexValue.quantity + 1;
      }
    }
    await user.save()
    res.json(user);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
}

exports.changeQuantity = async (req,res, next) => {
  try {
    const user = await User.findById(req.user.id).select('username cart');
    const cartIndex = user.cart.findIndex(i => {
      return i.productId == req.params.productId;
    });
    user.cart.at(cartIndex).quantity = req.body.quantity;
    await user.save();
    res.json(user);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.removeFromCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('username cart');
    const newCart = user.cart.filter(cartItem => {
      return cartItem.productId != req.params.productId;
    })
    user.cart = newCart;
    await user.save();
    res.json(user);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.clearCart = async (req , res, next) => {
  try {
    const user = await User.findById(req.user.id).select('username cart');
    user.cart = [];
    await user.save();
    res.json(user);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}