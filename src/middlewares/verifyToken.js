const jwt = require('jsonwebtoken')

module.exports = function verifyToken (req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: 'Token no proporcionado' })

  // El token normalmente viene en formato "Bearer <token>"
  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token mal formado' })

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' })

    req.user = user // Aquí ponemos los datos del usuario decodificado en la request
    next()
  })
}
