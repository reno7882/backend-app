// const express = require('express')
// const router = express.Router()
// const authenticateToken = require('../middlewares/auth.middleware')
// const serviceController = require('../controllers/service.controller')

// router.post('/', authenticateToken, serviceController.createService)
// router.get('/', authenticateToken, serviceController.getAllServices)
// router.get('/:id', authenticateToken, serviceController.getServiceById)
// router.put('/:id', authenticateToken, serviceController.updateService)
// router.delete('/:id', authenticateToken, serviceController.deleteService)

// module.exports = router

// Division entre fases de desarrollo fase 5 --------------------

// const express = require('express')
// const router = express.Router()
// const authenticateToken = require('../middlewares/auth.middleware')
// const authorizeRoles = require('../middlewares/role.middleware')
// const serviceController = require('../controllers/service.controller')

// router.post('/', authenticateToken, serviceController.createService)
// router.get('/', authenticateToken, serviceController.getAllServices)
// router.get('/:id', authenticateToken, serviceController.getServiceById)
// router.put('/:id', authenticateToken, serviceController.updateService)

// // Solo admin puede eliminar
// router.delete('/:id', authenticateToken, authorizeRoles('admin'), serviceController.deleteService)

// module.exports = router

// Division entre fases de desarrollo fase 7 --------------------
// const express = require('express')
// const router = express.Router()
// const authenticateToken = require('../middlewares/auth.middleware')
// const authorizeRoles = require('../middlewares/role.middleware')
// const serviceController = require('../controllers/service.controller')

// // Crear y actualizar: solo admin o superadmin
// router.post('/', authenticateToken, authorizeRoles('admin', 'superadmin'), serviceController.createService)
// router.put('/:id', authenticateToken, authorizeRoles('admin', 'superadmin'), serviceController.updateService)

// // Obtener: cualquier usuario autenticado
// router.get('/', authenticateToken, serviceController.getAllServices)
// router.get('/:id', authenticateToken, serviceController.getServiceById)

// // Eliminar: solo admin
// router.delete('/:id', authenticateToken, authorizeRoles('admin'), serviceController.deleteService)

// module.exports = router

// División de código fase 8 VALIDACIONES --------------------

const express = require('express')
const router = express.Router()

const authenticateToken = require('../middlewares/auth.middleware')
const authorizeRoles = require('../middlewares/role.middleware')
const serviceController = require('../controllers/service.controller')
const {
  validateCreateService,
  validateUpdateService
} = require('../middlewares/validators/service.validator')
const handleValidation = require('../middlewares/handle.Validation')

// Crear servicio (solo admin o superadmin)
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'superadmin'),
  validateCreateService,
  serviceController.createService
)

// Obtener todos
router.get('/', authenticateToken, serviceController.getAllServices)

// Obtener uno por ID
router.get('/:id', authenticateToken, serviceController.getServiceById)

// Actualizar servicio
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'superadmin'),
  validateUpdateService,
  handleValidation,
  serviceController.updateService
)

// Eliminar servicio (solo admin)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin', 'superadmin'),
  serviceController.deleteService
)

module.exports = router
