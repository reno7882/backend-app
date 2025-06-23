// // src/app.js
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const helmet = require('helmet')

// const authRoutes = require('./routes/auth.routes')

// // Middlewares
// app.use(express.json())
// app.use(cors())
// app.use(helmet())

// // Rutas
// app.use('/api/auth', authRoutes)

// app.get('/', (req, res) => {
//   res.send('API funcionando correctamente ✅')
// })

// module.exports = app

// División de código fase 4 -----------------------------

// src/app.js
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const helmet = require('helmet')

// const authRoutes = require('./routes/auth.routes')
// const userRoutes = require('./routes/user.routes') // <-- Aquí importas la ruta protegida

// // Middlewares
// app.use(express.json())
// app.use(cors())
// app.use(helmet())

// // Rutas
// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes) // <-- Aquí usas la ruta protegida

// app.get('/', (req, res) => {
//   res.send('API funcionando correctamente ✅')
// })

// module.exports = app

// División de código fase 4 -----------------------------

// src/app.js
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const helmet = require('helmet')

// const authRoutes = require('./routes/auth.routes')
// const userRoutes = require('./routes/user.routes') // <-- Aquí importas la ruta protegida
// const serviceRoutes = require('./routes/service.routes')

// // Middlewares
// app.use(express.json())
// app.use(cors())
// app.use(helmet())

// // Rutas
// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes) // <-- Aquí usas la ruta protegida
// app.use('/api/services', serviceRoutes) // <-- Aquí usas la ruta de servicios

// app.get('/', (req, res) => {
//   res.send('API funcionando correctamente ✅')
// })

// module.exports = app

// División de código fase 5 agreagar super admin -----------------------------

// src/app.js
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const helmet = require('helmet')

// const authRoutes = require('./routes/auth.routes')
// const userRoutes = require('./routes/user.routes') // <-- Aquí importas la ruta protegida
// const serviceRoutes = require('./routes/service.routes')

// const adminRoutes = require('./routes/admin.routes')

// // Middlewares
// app.use(express.json())
// app.use(cors())
// app.use(helmet())

// // Rutas
// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes) // <-- Aquí usas la ruta protegida
// app.use('/api/services', serviceRoutes) // <-- Aquí usas la ruta de servicios
// app.use('/api/admin', adminRoutes)

// app.get('/', (req, res) => {
//   res.send('API funcionando correctamente ✅')
// })

// module.exports = app

// División de código fase 6 agregar admin -----------------------------
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const helmet = require('helmet')

// const authRoutes = require('./routes/auth.routes')
// const userRoutes = require('./routes/user.routes') // <-- Aquí importas la ruta protegida
// const serviceRoutes = require('./routes/service.routes')

// const adminRoutes = require('./routes/admin.routes')

// // Middlewares
// app.use(express.json())
// app.use(cors())
// app.use(helmet())

// // Rutas
// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes) // <-- Aquí usas la ruta protegida
// app.use('/api/services', serviceRoutes) // <-- Aquí usas la ruta de servicios
// app.use('/api/admin', adminRoutes)
// app.use('/api/admin', adminRoutes)

// app.get('/', (req, res) => {
//   res.send('API funcionando correctamente ✅')
// })

// module.exports = app

// División de código fase 9 SEGURIDAD CON MIDDLEWARES -----------------------------

// const express = require('express')
// const app = express()
// const cors = require('cors')
// const helmet = require('helmet')

// // 🛡️ Seguridad adicional
// const rateLimit = require('express-rate-limit')
// // const mongoSanitize = require('express-mongo-sanitize')
// const { xss } = require('express-xss-sanitizer') // ✅ reemplazo moderno

// // 🧱 Middlewares de seguridad
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutos
//   max: 100,
//   message: 'Demasiadas solicitudes desde esta IP. Intenta más tarde.'
// })

// // Aplica middlewares globales
// app.use(express.json())
// app.use(cors())
// app.use(helmet())
// app.use(limiter) // Anti-DDoS
// app.use(xss()) // 🛡️ Reemplazo de xss-clean
// app.use((req, res, next) => {
//   const sanitize = require('express-mongo-sanitize').sanitize
//   if (req.body) sanitize(req.body)
//   next()
// })

// // Rutas
// const authRoutes = require('./routes/auth.routes')
// const userRoutes = require('./routes/user.routes')
// const serviceRoutes = require('./routes/service.routes')
// const adminRoutes = require('./routes/admin.routes')

// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes)
// app.use('/api/services', serviceRoutes)
// app.use('/api/admin', adminRoutes)

// app.get('/', (req, res) => {
//   res.send('API funcionando correctamente ✅')
// })

// module.exports = app

// División de código fase 10 TESTING -----------------------------
require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env'
}) // ⬅️ Añade esta línea
const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')

// 🛡️ Seguridad adicional
const rateLimit = require('express-rate-limit')
// const mongoSanitize = require('express-mongo-sanitize')
const { xss } = require('express-xss-sanitizer') // ✅ reemplazo moderno

// 🧱 Middlewares de seguridad
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: 'Demasiadas solicitudes desde esta IP. Intenta más tarde.'
})

// Aplica middlewares globales
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(limiter) // Anti-DDoS
app.use(xss()) // 🛡️ Reemplazo de xss-clean
app.use((req, res, next) => {
  const sanitize = require('express-mongo-sanitize').sanitize
  if (req.body) sanitize(req.body)
  next()
})

// Rutas
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const serviceRoutes = require('./routes/service.routes')
const adminRoutes = require('./routes/admin.routes')

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/admin', adminRoutes)

app.get('/', (req, res) => {
  res.send('API funcionando correctamente ✅')
})

module.exports = app
