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
const ClientesController = () => import('#controllers/clientes_controller')
const LoginController = () => import('#controllers/login_controller')

router.post('/signup', [UsersController, 'createUser']).middleware(middleware.userInput())
router.post('/login', [LoginController, 'index']).middleware(middleware.userInput())
router
  .group(() => {
    router.get('/cliente', [ClientesController, 'index'])
    router.get('/cliente/show/:id', [ClientesController, 'show'])
    router.post('/cliente/store', [ClientesController, 'store'])
  })
  .middleware(middleware.auth())
