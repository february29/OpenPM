var express = require('express');
const User = require('../constrollers/user')
var router = express.Router();


router.all('/login', User.login)

router.all('/register', User.register)

router.all('/loginout', User.loginout)

router.all('/userInfo', User.userInfo)

module.exports = router;
