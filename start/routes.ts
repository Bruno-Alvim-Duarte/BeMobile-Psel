/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const UsersController = () => import('../app/controllers/users_controller.js')
import { middleware } from './kernel.js'
const CategoriasController = () => import('#controllers/categorias_controller')
const ClientesController = () => import('#controllers/clientes_controller')
const LoginController = () => import('#controllers/login_controller')

router.post('/signup', [UsersController, 'createUser']).middleware(middleware.userInput())
router.post('/login', [LoginController, 'index']).middleware(middleware.userInput())
router
  .group(() => {
    router.get('/cliente', [ClientesController, 'index'])
    router.get('/cliente/show/:id', [ClientesController, 'show'])
    router
      .post('/cliente/store', [ClientesController, 'store'])
      .middleware(middleware.clienteInput())
    router.put('cliente/update/:id', [ClientesController, 'update'])
    router.delete('cliente/delete/:id', [ClientesController, 'delete'])
    router.get('/categoria', [CategoriasController, 'index'])
    router
      .post('/categoria/store', [CategoriasController, 'store'])
      .middleware(middleware.categoriaInput())
  })
  .middleware(middleware.auth())
