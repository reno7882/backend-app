// const express = require('express')
// const router = express.Router()
// const { login, register } = require('../controllers/auth.controller')

// router.post('/login', login)
// router.post('/register', register)

// module.exports = router

// src/routes/auth.routes.js

// DIVISIÓN DE CÓDIGO FASE 2 -----------------------------

// const express = require('express')
// const router = express.Router()
// const authController = require('../controllers/auth.controller')

// router.post('/register', authController.register) // 👈 sin paréntesis

// module.exports = router

// DIVISIÓN DE CÓDIGO FASE 3 -----------------------------

const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.post('/register', authController.register) // 👈 sin paréntesis
router.post('/login', authController.login) // 👈 sin paréntesis

module.exports = router
