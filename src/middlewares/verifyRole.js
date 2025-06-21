module.exports = function verifyRole (rolesPermitidos) {
  return (req, res, next) => {
    const user = req.user
    if (!user || !rolesPermitidos.includes(user.role)) {
      return res.status(403).json({ message: 'Acceso denegado' })
    }
    next()
  }
}
