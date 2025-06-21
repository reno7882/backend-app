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

// src/app.js
const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')

const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes') // <-- Aquí importas la ruta protegida

// Middlewares
app.use(express.json())
app.use(cors())
app.use(helmet())

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes) // <-- Aquí usas la ruta protegida

app.get('/', (req, res) => {
  res.send('API funcionando correctamente ✅')
})

module.exports = app
