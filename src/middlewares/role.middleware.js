// src/middlewares/role.middleware.js
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Acceso denegado: rol no autorizado' })
    }
    next()
  }
}

module.exports = authorizeRoles
