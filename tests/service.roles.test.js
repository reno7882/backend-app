/* eslint-env jest */

const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose') // <--- Importar mongoose para ObjectId
const Service = require('../src/models/Service')

// Crear un ObjectId válido para adminId
const adminId = new mongoose.Types.ObjectId()

const clienteToken = jwt.sign(
  { userId: new mongoose.Types.ObjectId().toString(), role: 'cliente' }, // también mejor id válido para cliente
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
)

const adminToken = jwt.sign(
  { userId: adminId.toString(), role: 'admin' }, // usar adminId.toString()
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
)

let servicioId // Variable global para guardar el servicio creado

beforeAll(async () => {
  await Service.deleteMany()
  const servicio = await Service.create({ nombre: 'Test Servicio', precio: 200 })
  servicioId = servicio._id.toString()
})

describe('🛡️ Control de acceso por rol', () => {
  test('✅ Cliente puede ver servicios', async () => {
    const res = await request(app)
      .get('/api/services')
      .set('Authorization', `Bearer ${clienteToken}`)

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test('❌ Cliente no puede crear servicio', async () => {
    const res = await request(app)
      .post('/api/services')
      .set('Authorization', `Bearer ${clienteToken}`)
      .send({ nombre: 'Servicio Nuevo', precio: 100 })

    expect(res.statusCode).toBe(403)
    expect(res.body.message).toMatch(/acceso denegado/i)
  })

  test('❌ Cliente no puede editar servicio', async () => {
    const res = await request(app)
      .put(`/api/services/${servicioId}`)
      .set('Authorization', `Bearer ${clienteToken}`)
      .send({ nombre: 'Editado por cliente', precio: 123 })

    expect(res.statusCode).toBe(403)
    expect(res.body.message).toMatch(/acceso denegado/i)
  })

  test('❌ Cliente no puede eliminar servicio', async () => {
    const res = await request(app)
      .delete(`/api/services/${servicioId}`)
      .set('Authorization', `Bearer ${clienteToken}`)

    expect(res.statusCode).toBe(403)
    expect(res.body.message).toMatch(/acceso denegado/i)
  })

  test('✅ Admin puede eliminar servicio', async () => {
    // Crear servicio asignando creadoPor al adminId ObjectId válido
    const nuevoServicio = await Service.create({
      nombre: 'Servicio a eliminar',
      precio: 100,
      creadoPor: adminId // ObjectId aquí
    })

    const res = await request(app)
      .delete(`/api/services/${nuevoServicio._id}`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.message).toMatch(/eliminado/i)
  })
})
