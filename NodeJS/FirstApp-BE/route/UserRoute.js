var express = require('express');
var router = express.Router();
var userController = require('../controller/UserController');
var verifyToken = require('../config/jwt-verify');

router.get('/', verifyToken, userController.getAllUsers);
router.get('/profile', verifyToken, userController.getUser);
router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;