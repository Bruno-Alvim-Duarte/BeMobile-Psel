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
const LoginController = () => import('#controllers/login_controller')

router.post('/signup', [UsersController, 'createUser']).middleware(middleware.userInput())
router.post('/login', [LoginController, 'index']).middleware(middleware.userInput())
