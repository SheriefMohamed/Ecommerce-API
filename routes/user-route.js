const router = require("express").Router();
const userController = require('../controllers/user-controller');
const verifyToken = require('./verify-token').verifyToken;
const verifyAdmin = require('./verify-token').verifyAdmin;
const verifyUser = require('./verify-token').verifyUser;

router.put("/:id", verifyToken ,verifyUser ,userController.updateUser)

router.delete("/:id", verifyToken ,verifyUser ,userController.deleteUser)

router.get("/:id", verifyToken ,verifyAdmin ,userController.getUser)

router.get("/",verifyToken ,verifyAdmin ,userController.getUsers)

module.exports = router;