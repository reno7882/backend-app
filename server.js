// server.js
// const app = require('./src/app')

// const PORT = process.env.PORT || 4000

// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en http://localhost:${PORT}`)
// })

// server.js
require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env'
})
const app = require('./src/app')
const connectDB = require('./src/config/db')

const PORT = process.env.PORT || 4000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
  })
})
