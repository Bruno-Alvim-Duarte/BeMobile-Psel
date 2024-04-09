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

router.post('/signup', [UsersController, 'createUser']).middleware(middleware.userInput())
