const router = require("express").Router();
const orderController = require('../controllers/order-controller');
const verifyToken = require('./verify-token').verifyToken;
const verifyAdmin = require('./verify-token').verifyAdmin;
const verifyUser = require('./verify-token').verifyUser

router.post("/", verifyToken, orderController.postOrder);

router.get("/:orderId",verifyToken,orderController.getOrder);

router.get("/", verifyToken, verifyAdmin ,orderController.getOrders)

module.exports = router;