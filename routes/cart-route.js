const router = require("express").Router();
const cartController = require('../controllers/cart-controller');
const verifyToken = require('./verify-token').verifyToken;
const verifyAdmin = require('./verify-token').verifyAdmin;
const verifyUser = require('./verify-token').verifyUser

router.post("/", verifyToken, cartController.postCart);

router.put("/:id", verifyToken, verifyAdmin ,cartController.updateCart);

router.delete("/:id", verifyToken, verifyAdmin ,cartController.deleteCart);

router.get("/:id",verifyToken,verifyUser,cartController.getCart);

router.get("/", verifyToken, verifyAdmin ,cartController.getCarts)

module.exports = router;