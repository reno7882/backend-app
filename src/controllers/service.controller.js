const Service = require('../models/Service')

exports.createService = async (req, res) => {
  try {
    const service = new Service({
      ...req.body,
      createdBy: req.user.userId
    })
    const saved = await service.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el servicio' })
  }
}

exports.getAllServices = async (req, res) => {
  const services = await Service.find()
  res.json(services)
}

exports.getServiceById = async (req, res) => {
  const service = await Service.findById(req.params.id)
  service
    ? res.json(service)
    : res.status(404).json({ message: 'Servicio no encontrado' })
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
