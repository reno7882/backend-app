// const Service = require('../models/Service')

// exports.createService = async (req, res) => {
//   try {
//     const service = new Service({
//       ...req.body,
//       createdBy: req.user.userId
//     })
//     const saved = await service.save()
//     res.status(201).json(saved)
//   } catch (err) {
//     res.status(500).json({ message: 'Error al crear el servicio' })
//   }
// }

// exports.getAllServices = async (req, res) => {
//   const services = await Service.find()
//   res.json(services)
// }

// exports.getServiceById = async (req, res) => {
//   const service = await Service.findById(req.params.id)
//   service
//     ? res.json(service)
//     : res.status(404).json({ message: 'Servicio no encontrado' })
// }

// exports.updateService = async (req, res) => {
//   try {
//     const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     updated
//       ? res.json(updated)
//       : res.status(404).json({ message: 'Servicio no encontrado' })
//   } catch (err) {
//     res.status(500).json({ message: 'Error al actualizar' })
//   }
// }

// exports.deleteService = async (req, res) => {
//   try {
//     const deleted = await Service.findByIdAndDelete(req.params.id)
//     deleted
//       ? res.json({ message: 'Servicio eliminado' })
//       : res.status(404).json({ message: 'Servicio no encontrado' })
//   } catch (err) {
//     res.status(500).json({ message: 'Error al eliminar' })
//   }
// }

// division entre fases de desarrollo fase 7 --------------------

// const Service = require('../models/Service')

// exports.createService = async (req, res) => {
//   try {
//     const service = new Service({
//       ...req.body,
//       creadoPor: req.user.userId // ✅ corregido aquí
//     })
//     const saved = await service.save()
//     res.status(201).json(saved)
//   } catch (err) {
//     res.status(500).json({ message: 'Error al crear el servicio' })
//   }
// }

// exports.getAllServices = async (req, res) => {
//   try {
//     const services = await Service.find().populate('creadoPor', 'email role') // ✅ opcional pero útil
//     res.json(services)
//   } catch (err) {
//     res.status(500).json({ message: 'Error al obtener servicios' })
//   }
// }

// exports.getServiceById = async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id)
//     service
//       ? res.json(service)
//       : res.status(404).json({ message: 'Servicio no encontrado' })
//   } catch (err) {
//     res.status(500).json({ message: 'Error al obtener el servicio' })
//   }
// }

// exports.updateService = async (req, res) => {
//   try {
//     const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     updated
//       ? res.json(updated)
//       : res.status(404).json({ message: 'Servicio no encontrado' })
//   } catch (err) {
//     res.status(500).json({ message: 'Error al actualizar' })
//   }
// }

// exports.deleteService = async (req, res) => {
//   try {
//     const deleted = await Service.findByIdAndDelete(req.params.id)
//     deleted
//       ? res.json({ message: 'Servicio eliminado' })
//       : res.status(404).json({ message: 'Servicio no encontrado' })
//   } catch (err) {
//     res.status(500).json({ message: 'Error al eliminar' })
//   }
// }

// division entre fases de desarrollo fase 8 VALIDACIONES --------------------
// const { validationResult } = require('express-validator')
// const Service = require('../models/Service')

// exports.createService = async (req, res) => {
//   // Validar errores de express-validator
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() })
//   }

//   try {
//     const service = new Service({
//       ...req.body,
//       creadoPor: req.user.userId // 🟢 Campo correcto
//     })
//     const saved = await service.save()
//     res.status(201).json(saved)
//   } catch (err) {
//     res.status(500).json({ message: 'Error al crear el servicio' })
//   }
// }

// exports.getAllServices = async (req, res) => {
//   try {
//     const services = await Service.find().populate('creadoPor', 'email role') // ✅ opcional pero útil
//     res.json(services)
//   } catch (err) {
//     res.status(500).json({ message: 'Error al obtener servicios' })
//   }
// }

// exports.getServiceById = async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id)
//     service
//       ? res.json(service)
//       : res.status(404).json({ message: 'Servicio no encontrado' })
//   } catch (err) {
//     res.status(500).json({ message: 'Error al obtener el servicio' })
//   }
// }

// exports.updateService = async (req, res) => {
//   try {
//     const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     updated
//       ? res.json(updated)
//       : res.status(404).json({ message: 'Servicio no encontrado' })
//   } catch (err) {
//     res.status(500).json({ message: 'Error al actualizar' })
//   }
// }

// exports.deleteService = async (req, res) => {
//   try {
//     const deleted = await Service.findByIdAndDelete(req.params.id)
//     deleted
//       ? res.json({ message: 'Servicio eliminado' })
//       : res.status(404).json({ message: 'Servicio no encontrado' })
//   } catch (err) {
//     res.status(500).json({ message: 'Error al eliminar' })
//   }
// }

// division entre fases de desarrollo fase 9 OWNER SHIP CONTROL --------------------

const { validationResult } = require('express-validator')
const Service = require('../models/Service')

exports.createService = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const service = new Service({
      ...req.body,
      creadoPor: req.user.userId
    })
    const saved = await service.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el servicio' })
  }
}

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate('creadoPor', 'email role')
    res.json(services)
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener servicios' })
  }
}

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    service
      ? res.json(service)
      : res.status(404).json({ message: 'Servicio no encontrado' })
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el servicio' })
  }
}

exports.updateService = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const service = await Service.findById(req.params.id)
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' })
    }

    // 🛡️ Ownership check
    if (service.creadoPor.toString() !== req.user.userId && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'No tienes permiso para modificar este servicio' })
    }

    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar' })
  }
}

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' })
    }

    // 🛡️ Ownership check seguro
    const creadoPorId = service.creadoPor ? service.creadoPor.toString() : null
    if (creadoPorId !== req.user.userId && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este servicio' })
    }

    await service.deleteOne()
    res.json({ message: 'Servicio eliminado' })
  } catch (err) {
    console.error('Error en deleteService:', err) // para que puedas ver el error en consola
    res.status(500).json({ message: 'Error al eliminar' })
  }
}
