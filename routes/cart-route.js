const router = require("express").Router();
const cartController = require('../controllers/cart-controller');
const verifyToken = require('./verify-token').verifyToken;

router.get('/',verifyToken, cartController.getCart);

router.post('/add/:productId',verifyToken, cartController.AddToCart);

router.post('/remove/:productId',verifyToken, cartController.removeFromCart);

router.post('/quantity/:productId',verifyToken, cartController.changeQuantity);

router.post('/clear',verifyToken, cartController.clearCart);

module.exports = router;