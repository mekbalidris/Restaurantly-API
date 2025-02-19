const express = require('express')
const { register, login} = require('../controllers/authController')
const { bookTableController } = require('../controllers/bookTableController')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/book-table', bookTableController)


module.exports = router