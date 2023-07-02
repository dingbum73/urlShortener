const express = require('express')
const router = express.Router()
const home = require('./modules/home')// 引入模組程式碼

router.use('/', home)

module.exports = router