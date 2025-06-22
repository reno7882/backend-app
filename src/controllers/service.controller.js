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

const Service = require('../models/Service')

exports.createService = async (req, res) => {
  try {
    const service = new Service({
      ...req.body,
      creadoPor: req.user.userId // ✅ corregido aquí
    })
    const saved = await service.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el servicio' })
  }
}

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate('creadoPor', 'email role') // ✅ opcional pero útil
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
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
    updated
      ? res.json(updated)
      : res.status(404).json({ message: 'Servicio no encontrado' })
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar' })
  }
}

exports.deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id)
    deleted
      ? res.json({ message: 'Servicio eliminado' })
      : res.status(404).json({ message: 'Servicio no encontrado' })
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar' })
  }
}
