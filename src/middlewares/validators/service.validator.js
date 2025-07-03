const { body, param, validationResult } = require('express-validator')

// Validar creación de servicio
const validateCreateService = [
  body('nombre')
    .notEmpty().withMessage('El nombre del servicio es obligatorio o contiene caracteres invalidos').escape(),
  body('precio')
    .isNumeric().withMessage('El precio debe ser un número')
    .notEmpty().withMessage('El precio es obligatorio'),
  body('descripcion')
    .optional().isString().withMessage('La descripción debe ser texto').escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

// Validar actualización (similar pero no requiere todo)
const validateUpdateService = [
  body('nombre')
    .optional().trim().notEmpty().withMessage('El nombre no puede estar vacío').escape(),
  body('precio')
    .optional().isNumeric().withMessage('El precio debe ser un número'),
  body('descripcion')
    .optional().isString().withMessage('La descripción debe ser texto').escape(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

// Validar ID para rutas que usan :id
const validateMongoIdParam = [
  param('id')
    .isMongoId().withMessage('El ID proporcionado no es válido'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

module.exports = {
  validateCreateService,
  validateUpdateService,
  validateMongoIdParam
}
