// exports.login = (req, res) => {
//   res.json({ message: 'Login (aún no implementado)' })
// }

// exports.register = (req, res) => {
//   res.json({ message: 'Registro (aún no implementado)' })
// }

// Division entre fases de desarrollo --------------------

// const bcrypt = require('bcrypt')
// const User = require('../models/User')

// exports.register = async (req, res) => {
//   const { email, password } = req.body

//   try {
//     // Validación básica
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email y contraseña son requeridos' })
//     }

//     // ¿Ya existe ese email?
//     const existeUsuario = await User.findOne({ email })
//     if (existeUsuario) {
//       return res.status(400).json({ message: 'Ese email ya está registrado' })
//     }

//     // Encriptar contraseña
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)

//     // Crear usuario
//     const nuevoUsuario = new User({ email, password: hashedPassword })
//     await nuevoUsuario.save()

//     res.status(201).json({ message: 'Usuario registrado con éxito' })
//   } catch (error) {
//     console.error('Error en registro:', error.message)
//     res.status(500).json({ message: 'Error del servidor' })
//   }
// }

// Division entre fases de desarrollo --------------------

// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const User = require('../models/User')

// exports.register = async (req, res) => {
//   const { email, password } = req.body

//   try {
//     // Validación básica
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email y contraseña son requeridos' })
//     }

//     // ¿Ya existe ese email?
//     const existeUsuario = await User.findOne({ email })
//     if (existeUsuario) {
//       return res.status(400).json({ message: 'Ese email ya está registrado' })
//     }

//     // Encriptar contraseña
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)

//     // Crear usuario
//     const nuevoUsuario = new User({ email, password: hashedPassword })
//     await nuevoUsuario.save()

//     res.status(201).json({ message: 'Usuario registrado con éxito' })
//   } catch (error) {
//     console.error('Error en registro:', error.message)
//     res.status(500).json({ message: 'Error del servidor' })
//   }
// }

// exports.login = async (req, res) => {
//   const { email, password } = req.body

//   try {
//     // Validar campos
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email y contraseña son requeridos' })
//     }

//     // Buscar usuario
//     const user = await User.findOne({ email })
//     if (!user) {
//       return res.status(400).json({ message: 'Usuario o contraseña incorrectos' })
//     }

//     // Comparar contraseña
//     const isMatch = await bcrypt.compare(password, user.password)
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Usuario o contraseña incorrectos' })
//     }

//     // Generar token JWT
//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     )

//     res.json({ token })
//   } catch (error) {
//     console.error('Error en login:', error.message)
//     res.status(500).json({ message: 'Error del servidor' })
//   }
// }

// Division entre fases de desarrollo fase 5 --------------------

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

exports.register = async (req, res) => {
  const { username, email, password } = req.body

  try {
    // Validación básica
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' })
    }

    // ¿Ya existe ese email?
    const existeUsuario = await User.findOne({ email })
    if (existeUsuario) {
      return res.status(400).json({ message: 'Ese email ya está registrado' })
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Crear usuario
    const nuevoUsuario = new User({ username, email, password: hashedPassword })
    await nuevoUsuario.save()

    res.status(201).json({ message: 'Usuario registrado con éxito' })
  } catch (error) {
    console.error('Error en registro:', error.message)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    // Validar campos
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' })
    }

    // Buscar usuario
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' })
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' })
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role // Incluimos el rol del usuario en el token
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ token })
  } catch (error) {
    console.error('Error en login:', error.message)
    res.status(500).json({ message: 'Error del servidor' })
  }
}
