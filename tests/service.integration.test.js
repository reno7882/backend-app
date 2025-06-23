/* eslint-env jest */
// tests/service.integration.test.js
const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const User = require('../src/models/User') // Si usas mongoose para usuarios
const mongoose = require('mongoose')

describe('🔐 Rutas protegidas de servicios', () => {
  let token

  beforeAll(async () => {
    // Aquí crea un usuario con rol "admin" o el que quieras probar
    const user = new User({
      username: 'adminuser',
      email: 'admin@example.com',
      password: 'password123', // usualmente se debe hashear, pero para test ok así
      role: 'admin'
    })
    await user.save()

    // Genera un token JWT con el payload correcto (id, email, role)
    token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
  })

  afterAll(async () => {
    // Limpia DB después de pruebas
    await User.deleteMany({})
    await mongoose.connection.close()
  })

  test('✅ Debe permitir acceso con token válido', async () => {
    const res = await request(app)
      .get('/api/services')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})
