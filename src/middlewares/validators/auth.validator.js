const { body, validationResult } = require('express-validator')

// Validaciones para registro
const validateRegister = [
  body('username').notEmpty().withMessage('El username es obligatorio'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

// Validaciones para login
const validateLogin = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

module.exports = {
  validateRegister,
  validateLogin
}
