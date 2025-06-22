// src/models/Service.js
// const mongoose = require('mongoose')

// const serviceSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   description: String,
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
// }, { timestamps: true })

// module.exports = mongoose.model('Service', serviceSchema)

// división de código fase 7 --------------------

const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String
  },
  precio: {
    type: Number,
    required: true
  },
  creadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = mongoose.model('Service', serviceSchema)
