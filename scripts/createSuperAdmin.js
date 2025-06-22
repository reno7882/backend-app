// scripts/createSuperAdmin.js
require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../src/models/User')

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const exists = await User.findOne({ email: 'admin@ejemplo.com' })
  if (exists) {
    console.log('❌ Ya existe un admin con ese correo')
    process.exit()
  }

  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = new User({
    username: 'superadmin',
    email: 'admin@ejemplo.com',
    password: hashedPassword,
    role: 'superadmin'
  })

  await admin.save()
  console.log('✅ Superadmin creado con éxito')
  process.exit()
})
