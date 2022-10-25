const router = require("express").Router();
const productController = require('../controllers/product-controller');
const verifyToken = require('./verify-token').verifyToken;
const verifyAdmin = require('./verify-token').verifyAdmin;

router.post("/", verifyToken, verifyAdmin ,productController.postProduct);

router.put("/:id", verifyToken, verifyAdmin ,productController.updateProduct);

router.delete("/:id", verifyToken, verifyAdmin ,productController.deleteProduct);

router.get("/:id",productController.getProduct);

router.get("/",productController.getProducts)

module.exports = router;