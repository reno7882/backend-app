/* eslint-disable  */
const request = require('supertest')
const app = require('../src/app')

describe('Auth Endpoints', () => {
  test('debe registrar un nuevo usuario', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
      // agrega otros campos necesarios
    })

    // console.log(res.statusCode, res.body)  <--- para debug

    expect(res.statusCode).toBe(201)
    // Cambiado para validar el mensaje actual que devuelve el backend
    expect(res.body.message).toBe('Usuario registrado con éxito')
  })

  test('debe hacer login con un usuario válido', async () => {
    // Primero aseguramos que el usuario esté registrado
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'loginuser', // usa username si es obligatorio
        email: 'login@example.com',
        password: '123456'
      })

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@example.com',
        password: '123456'
      })

    // console.log(res.statusCode, res.body)  <--- para debug

    expect(res.statusCode).toBe(200)
    expect(res.body.token).toBeDefined()
    expect(res.body.user.email).toBe('login@example.com')
  })

  test('no debe permitir registro con email duplicado', async () => {
    // Registro inicial
    await request(app).post('/api/auth/register').send({
      username: 'usuario1',
      email: 'duplicado@example.com',
      password: '123456'
    })

    // Intento de registrar con mismo email
    const res = await request(app).post('/api/auth/register').send({
      username: 'usuario2',
      email: 'duplicado@example.com',
      password: 'abcdef'
    })

    expect(res.statusCode).toBe(400)
    expect(res.body.message).toMatch(/registrado/i)
  })

  test('no debe permitir login con contraseña incorrecta', async () => {
    await request(app).post('/api/auth/register').send({
      username: 'fallologin',
      email: 'fallo@example.com',
      password: 'correcta123'
    })

    const res = await request(app).post('/api/auth/login').send({
      email: 'fallo@example.com',
      password: 'incorrecta456'
    })

    expect(res.statusCode).toBeGreaterThanOrEqual(400)
    expect(res.statusCode).toBeLessThan(500)
    expect(res.body.message).toMatch(/incorrect/i)
  })
})
