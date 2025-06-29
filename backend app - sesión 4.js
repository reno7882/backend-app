/* eslint-disable */
//  Paso 2: Código básico para login en src/controllers/auth.controller.js
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

______________________________________________________________________________

// Paso 3: Agregar ruta para login en src/routes/auth.routes.js

// const express = require('express')
// const router = express.Router()
// const authController = require('../controllers/auth.controller')

// router.post('/register', authController.register) // 👈 sin paréntesis
// router.post('/login', authController.login) // 👈 sin paréntesis

// module.exports = router

______________________________________________________________________________

// ✅ Probar en Postman
// •	Método: POST
// •	URL: http://localhost:4000/api/auth/login
// •	Headers: Content-Type: application/json
// •	Body:json
// {
//   "email": "ejemplo@correo.com",
//   "password": "123456"
// }

// Resultado esperado
// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
// }

______________________________________________________________________________

// Crear middleware src/middlewares/auth.middleware.js ✅✅✅

// const jwt = require('jsonwebtoken')

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers.authorization
//   const token = authHeader && authHeader.split(' ')[1]

//   if (!token) {
//     return res.status(401).json({ message: 'Token no proporcionado' })
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     req.user = decoded
//     next()
//   } catch (err) {
//     return res.status(403).json({ message: 'Token inválido o expirado' })
//   }
// }

// module.exports = authenticateToken

______________________________________________________________________________

// Usar middleware en una ruta protegida ✅✅✅
// Por ejemplo, crea una ruta de perfil en src/routes/user.routes.js:

// const express = require('express');
// const router = express.Router();
// const authenticateToken = require('../middlewares/auth.middleware');

// router.get('/profile', authenticateToken, (req, res) => {
//   res.json({
//     message: 'Acceso a perfil permitido',
//     user: req.user
//   });
// });

// module.exports = router;

______________________________________________________________________________

// Importar la ruta protegida en tu src/app.js o server.js
// const userRoutes = require('./routes/user.routes');
// app.use('/api/user', userRoutes);

// const express = require('express')
// const app = express()
// const cors = require('cors')
// const helmet = require('helmet')

// const authRoutes = require('./routes/auth.routes')
// const userRoutes = require('./routes/user.routes') // <-- Aquí importas la ruta protegida

// // Middlewares
// app.use(express.json())
// app.use(cors())
// app.use(helmet())

// // Rutas
// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes) // <-- Aquí usas la ruta protegida

// app.get('/', (req, res) => {
//   res.send('API funcionando correctamente ✅')
// })

// module.exports = app

______________________________________________________________________________

// ✅ Probar en Postman
// 1.	Hacer login y copiar el token
// 2.	Crear una petición GET a http://localhost:4000/api/user/profile
// 3.	En Headers agregar:
// Authorization: Bearer <token>
// ________________________________________
// Si el token es válido, verás la respuesta con el mensaje y datos del usuario.

______________________________________________________________________________

// YA LO HICIMOS ADELANTADOS Y SOLO CAMBIARÍA UNA VEZ MÁS POR creadoPor <----------
// ✅ Objetivo: CRUD de servicios + protección con token
// 🧩 Modelo de ejemplo (Service)

// // src/models/Service.js
// const mongoose = require('mongoose');

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
// }, { timestamps: true });

// module.exports = mongoose.model('Service', serviceSchema);

______________________________________________________________________________

// 📁 Rutas (src/routes/service.routes.js)
// (SOLO TENEMOS CREATE SERVICE POR EL MOMENTO)<------
// PUEDE SER PRIMERO LO DE ABAJO LOS CRUD CONTROLLERS <---------

// const express = require('express');
// const router = express.Router();
// const authenticateToken = require('../middlewares/auth.middleware');
// const serviceController = require('../controllers/service.controller');

// router.post('/', authenticateToken, serviceController.createService);
// router.get('/', authenticateToken, serviceController.getAllServices);
// router.get('/:id', authenticateToken, serviceController.getServiceById);
// router.put('/:id', authenticateToken, serviceController.updateService);
// router.delete('/:id', authenticateToken, serviceController.deleteService);

// module.exports = router;

______________________________________________________________________________

// 🧠 Controlador (src/controllers/service.controller.js)

// const Service = require('../models/Service');

// exports.createService = async (req, res) => {
//   try {
//     const service = new Service({
//       ...req.body,
//       createdBy: req.user.userId
//     });
//     const saved = await service.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ message: 'Error al crear el servicio' });
//   }
// };

// exports.getAllServices = async (req, res) => {
//   const services = await Service.find();
//   res.json(services);
// };

// exports.getServiceById = async (req, res) => {
//   const service = await Service.findById(req.params.id);
//   service
//     ? res.json(service)
//     : res.status(404).json({ message: 'Servicio no encontrado' });
// };

// exports.updateService = async (req, res) => {
//   try {
//     const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     updated
//       ? res.json(updated)
//       : res.status(404).json({ message: 'Servicio no encontrado' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error al actualizar' });
//   }
// };

// exports.deleteService = async (req, res) => {
//   try {
//     const deleted = await Service.findByIdAndDelete(req.params.id);
//     deleted
//       ? res.json({ message: 'Servicio eliminado' })
//       : res.status(404).json({ message: 'Servicio no encontrado' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error al eliminar' });
//   }
// };

______________________________________________________________________________

// 🧩 Agregar a app.js

// const serviceRoutes = require('./routes/service.routes');
// app.use('/api/services', serviceRoutes);
// ESTO YA ESTABA NOS ADELANTAMOS EN EL SERVICE ROUTES <-----

// src/app.js
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const helmet = require('helmet')

// const authRoutes = require('./routes/auth.routes')
// const userRoutes = require('./routes/user.routes') // <-- Aquí importas la ruta protegida
// const serviceRoutes = require('./routes/service.routes')

// // Middlewares
// app.use(express.json())
// app.use(cors())
// app.use(helmet())

// // Rutas
// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes) // <-- Aquí usas la ruta protegida
// app.use('/api/services', serviceRoutes) // <-- Aquí usas la ruta de servicios

// app.get('/', (req, res) => {
//   res.send('API funcionando correctamente ✅')
// })

// module.exports = app

______________________________________________________________________________

// 🧪 Probar con Postman
// •	POST /api/services → crear (requiere token)
// •	GET /api/services → obtener todos
// •	GET /api/services/:id → uno
// •	PUT /api/services/:id → actualizar
// •	DELETE /api/services/:id → eliminar
// •	✅ 1. POST /api/services — Crear un servicio
// •	Método: POST
// •	URL: http://localhost:4000/api/services
// Headers:
// •	http
// •	CopiarEditar
// •	Authorization: Bearer <tu_token>
// •	Content-Type: application/json
// •	Body (JSON):
// •	json
// •	CopiarEditar
// •	{
// •	  "title": "Desarrollo Web",
// •	  "description": "Servicio completo de desarrollo de sitios web."
// •	}
// •	________________________________________
// •	✅ 2. GET /api/services — Obtener todos los servicios
// •	Método: GET
// •	URL: http://localhost:4000/api/services
// Headers:
// •	http
// •	CopiarEditar
// •	Authorization: Bearer <tu_token>
// •	________________________________________
// •	✅ 3. GET /api/services/:id — Obtener un servicio por ID
// •	Primero, copia el _id de uno de los servicios que te haya devuelto el GET anterior.
// •	Método: GET
// •	URL: http://localhost:4000/api/services/ID_DEL_SERVICIO
// Headers:
// •	http
// •	CopiarEditar
// •	Authorization: Bearer <tu_token>
// •	________________________________________
// •	✅ 4. PUT /api/services/:id — Actualizar un servicio
// •	Método: PUT
// •	URL: http://localhost:4000/api/services/ID_DEL_SERVICIO
// Headers:
// •	http
// •	CopiarEditar
// •	Authorization: Bearer <tu_token>
// •	Content-Type: application/json
// •	Body (JSON):
// •	json
// •	CopiarEditar
// •	{
// •	  "title": "Desarrollo Web Profesional",
// •	  "description": "Diseño, desarrollo y despliegue de sitios modernos."
// •	}
// •	________________________________________
// •	✅ 5. DELETE /api/services/:id — Eliminar un servicio
// •	Método: DELETE
// •	URL: http://localhost:4000/api/services/ID_DEL_SERVICIO
// Headers:
// •	http
// •	CopiarEditar
// •	Authorization: Bearer <tu_token>

______________________________________________________________________________

// 1. Actualizar el modelo User para incluir roles ✅✅✅ (TENGO DUDA SI SE QUEDA ASÍ)

// src/models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ['admin', 'cliente'],
//     default: 'cliente'
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);

______________________________________________________________________________

// 2. Middleware para verificar roles ✅✅✅
// Creamos un middleware que verifique si el usuario tiene el rol adecuado para acceder a cierta ruta.

// // src/middlewares/role.middleware.js
// const authorizeRoles = (...allowedRoles) => {
//   return (req, res, next) => {
//     const userRole = req.user.role;
//     if (!allowedRoles.includes(userRole)) {
//       return res.status(403).json({ message: 'Acceso denegado: rol no autorizado' });
//     }
//     next();
//   };
// };

// module.exports = authorizeRoles;

______________________________________________________________________________

// 3. Modificar el payload del JWT para incluir el rol
// Cuando generes el token en el login, incluye el rol:
// // En el controlador src/controllers/auth.controller.js, al crear el token:

// const token = jwt.sign(
//   {
//     userId: user._id,
//     email: user.email,
//     role: user.role
//   },
//   process.env.JWT_SECRET,
//   { expiresIn: '1h' }
// );

______________________________________________________________________________

// 4. Proteger rutas con el middleware de roles en \src\routes\service.routes.js
// Por ejemplo, solo un admin puede eliminar un servicio:

// const express = require('express');
// const router = express.Router();
// const authenticateToken = require('../middlewares/auth.middleware');
// const authorizeRoles = require('../middlewares/role.middleware');
// const serviceController = require('../controllers/service.controller');

// router.post('/', authenticateToken, serviceController.createService);
// router.get('/', authenticateToken, serviceController.getAllServices);
// router.get('/:id', authenticateToken, serviceController.getServiceById);
// router.put('/:id', authenticateToken, serviceController.updateService);

// // Solo admin puede eliminar
// router.delete('/:id', authenticateToken, authorizeRoles('admin'), serviceController.deleteService);

// module.exports = router;

______________________________________________________________________________

// 5. Prueba
// •	Crea usuarios con roles "admin" y "cliente" en la base de datos.
// •	Usa el login para obtener tokens con sus roles.
// •	Prueba que solo el admin pueda eliminar servicios (DELETE /api/services/:id).
// •	El cliente tendrá acceso a las otras rutas, pero no podrá eliminar.
// 1. Crear el superadmin manualmente (una vez)
// Abre Compass, y en la colección users crea un documento como este:
// json
// CopiarEditar
// {
//   "username": "superadmin",
//   "email": "admin@ejemplo.com",
//   "password": "<contraseña-hasheada>",
//   "role": "admin"
// }
// 👉 O mejor aún, te paso un script para hacerlo:
// js
// CopiarEditar
// // scripts/createSuperAdmin.js
// require('dotenv').config();
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const User = require('../src/models/User');

// mongoose.connect(process.env.MONGO_URI).then(async () => {
//   const exists = await User.findOne({ email: 'admin@ejemplo.com' });
//   if (exists) {
//     console.log('❌ Ya existe un admin con ese correo');
//     process.exit();
//   }

//   const hashedPassword = await bcrypt.hash('admin123', 10);
//   const admin = new User({
//     username: 'superadmin',
//     email: 'admin@ejemplo.com',
//     password: hashedPassword,
//     role: 'admin'
//   });

//   await admin.save();
//   console.log('✅ Superadmin creado con éxito');
//   process.exit();
// });
// Y lo ejecutas con:
// bash
// CopiarEditar
// node scripts/createSuperAdmin.js

______________________________________________________________________________

// 2. Crear una ruta para que solo admin cree otros admins

// // src/routes/admin.routes.js
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const authenticateToken = require('../middlewares/auth.middleware');
// const authorizeRoles = require('../middlewares/role.middleware');

// // Ruta protegida solo para admin
// router.post('/create-admin', authenticateToken, authorizeRoles('admin'), async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ message: 'Ya existe el correo' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newAdmin = new User({
//       username,
//       email,
//       password: hashedPassword,
//       role: 'admin'
//     });

//     await newAdmin.save();
//     res.status(201).json({ message: 'Admin creado correctamente' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error al crear el admin' });
//   }
// });

// module.exports = router;

// Y en app.js:

// const adminRoutes = require('./routes/admin.routes');
// app.use('/api/admin', adminRoutes);

______________________________________________________________________________

// 🔹 Probar la ruta protegida para crear otros admins
// 1.	Inicia sesión con el superadmin (/api/auth/login)
// 2.	Copia el token
// 3.	Haz un POST a:
// pgsql
// CopiarEditar
// POST http://localhost:4000/api/admin/create-admin
// Con headers:
// makefile
// CopiarEditar
// Authorization: Bearer <tu_token>
// Y body JSON:
// json
// CopiarEditar
// {
//   "username": "admin2",
//   "email": "admin2@ejemplo.com",
//   "password": "admin123"
// }
// ✅ Si responde "Admin creado correctamente", todo está funcionando.

______________________________________________________________________________

// 🛠️ Paso a paso: Ruta protegida para crear admins
// ✅ 1. Verifica que tus usuarios tienen un campo role
// En tu modelo User, asegúrate de tener esto:

// // src/models/User.js
// const userSchema = new mongoose.Schema({
//   username: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, enum: ['cliente', 'admin', 'superadmin'], default: 'cliente' }
// });

______________________________________________________________________________

// ✅ 2. Middleware para verificar rol ✅✅✅

// src/middlewares/verifyRole.js

// module.exports = function verifyRole(rolesPermitidos) {
//   return (req, res, next) => {
//     const user = req.user;
//     if (!user || !rolesPermitidos.includes(user.role)) {
//       return res.status(403).json({ message: 'Acceso denegado' });
//     }
//     next();
//   };
// };

______________________________________________________________________________

// ✅ 3. Ruta protegida para crear otros admins
// En src/routes/admin.routes.js:

// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const verifyToken = require('../middlewares/verifyToken');
// const verifyRole = require('../middlewares/verifyRole');

// // POST /api/admin/create-admin
// router.post('/create-admin', verifyToken, verifyRole(['admin', 'superadmin']), async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     const existe = await User.findOne({ email });
//     if (existe) return res.status(400).json({ message: 'Ya existe un usuario con ese correo' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const nuevoAdmin = new User({
//       username,
//       email,
//       password: hashedPassword,
//       role: 'admin'
//     });

//     await nuevoAdmin.save();

//     res.status(201).json({ message: 'Admin creado correctamente' });
//   } catch (error) {
//     console.error('Error al crear admin:', error);
//     res.status(500).json({ message: 'Error en el servidor' });
//   }
// });

// module.exports = router;

______________________________________________________________________________

// ✅ 4. Cargar la ruta en src/app.js

// const adminRoutes = require('./routes/admin.routes');
// app.use('/api/admin', adminRoutes);

______________________________________________________________________________

// ✅ 5. Probar con token de superadmin o admin
// Usando Thunder Client o Postman:
// •	Endpoint: POST http://localhost:4000/api/admin/create-admin
// •	Header:
// o	Authorization: Bearer <token del superadmin>
// •	Body JSON:
// json
// CopiarEditar
// {
//   "username": "nuevoAdmin",
//   "email": "adminnuevo@correo.com",
//   "password": "admin123"
// }

______________________________________________________________________________
