// const express = require('express')
// const router = express.Router()
// const User = require('../models/User')
// const bcrypt = require('bcrypt')

// const verifyToken = require('../middlewares/verifyToken')
// const verifyRole = require('../middlewares/verifyRole')

// // POST /api/admin/create-admin
// router.post('/create-admin', verifyToken, verifyRole(['admin', 'superadmin']), async (req, res) => {
//   try {
//     const { username, email, password } = req.body

//     const existe = await User.findOne({ email })
//     if (existe) return res.status(400).json({ message: 'Ya existe un usuario con ese correo' })

//     const hashedPassword = await bcrypt.hash(password, 10)

//     const nuevoAdmin = new User({
//       username,
//       email,
//       password: hashedPassword,
//       role: 'admin'
//     })

//     await nuevoAdmin.save()

//     res.status(201).json({ message: 'Admin creado correctamente' })
//   } catch (error) {
//     console.error('Error al crear admin:', error)
//     res.status(500).json({ message: 'Error en el servidor' })
//   }
// })

// module.exports = router

// division entre fases de desarrollo fase 6 --------------------

const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

const verifyToken = require('../middlewares/verifyToken')
const verifyRole = require('../middlewares/verifyRole')

// POST /api/admin/create-admin
router.post('/create-admin', verifyToken, verifyRole(['admin', 'superadmin']), async (req, res) => {
  try {
    const { username, email, password } = req.body

    const existe = await User.findOne({ email })
    if (existe) return res.status(400).json({ message: 'Ya existe un usuario con ese correo' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const nuevoAdmin = new User({
      username,
      email,
      password: hashedPassword,
      role: 'admin'
    })

    await nuevoAdmin.save()

    res.status(201).json({ message: 'Admin creado correctamente' })
  } catch (error) {
    console.error('Error al crear admin:', error)
    res.status(500).json({ message: 'Error en el servidor' })
  }
})

// GET /api/admin/dashboard
router.get('/dashboard', verifyToken, verifyRole(['admin', 'superadmin']), (req, res) => {
  res.json({
    message: `Bienvenido al panel de administrador, ${req.user.email}`,
    role: req.user.role
  })
})

module.exports = router
