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
const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')

const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes') // <-- Aquí importas la ruta protegida
const serviceRoutes = require('./routes/service.routes')

const adminRoutes = require('./routes/admin.routes')

// Middlewares
app.use(express.json())
app.use(cors())
app.use(helmet())

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes) // <-- Aquí usas la ruta protegida
app.use('/api/services', serviceRoutes) // <-- Aquí usas la ruta de servicios
app.use('/api/admin', adminRoutes)
app.use('/api/admin', adminRoutes)

app.get('/', (req, res) => {
  res.send('API funcionando correctamente ✅')
})

module.exports = app
