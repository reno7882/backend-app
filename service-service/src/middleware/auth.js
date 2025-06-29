// middleware/auth.js
import jwt from 'jsonwebtoken'

export function verifyToken (req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: 'No token provided' })

  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token mal formado' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // { userId, role, iat, exp }
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' })
  }
}
