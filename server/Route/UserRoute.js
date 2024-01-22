const express = require('express')
const {UserSignUp, UserLogin}  = require('../Controler/UserController')

const router = express.Router()

router.post('/signup', UserSignUp)
router.post('/login', UserLogin)

module.exports = router