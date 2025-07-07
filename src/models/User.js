// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// }, {
//   timestamps: true // Crea campos createdAt y updatedAt automáticamente
// })

// module.exports = mongoose.model('User', userSchema)

// División de código fase 5 -----------------------------

// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ['admin', 'cliente'],
//     default: 'cliente'
//   }
// }, { timestamps: true })

// module.exports = mongoose.model('User', userSchema)

// División de código fase 5 agreagar super admin -----------------------------

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'cliente', 'superadmin'], // Agregamos superadmin
    default: 'cliente'
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
