const router = require("express").Router();
const authController = require('../controllers/auth-controller');

router.post('/signup', authController.postSignup);

router.post('/login', authController.postLogin);

router.post('/reset', authController.postReset);

router.post('/new-password', authController.postResetNewPassword);

module.exports = router;