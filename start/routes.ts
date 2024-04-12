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
const ProdutosController = () => import('#controllers/produtos_controller')
const CategoriasController = () => import('#controllers/categorias_controller')
const ClientesController = () => import('#controllers/clientes_controller')
const LoginController = () => import('#controllers/login_controller')

router.post('/signup', [UsersController, 'createUser']).middleware(middleware.userInput())
router.post('/login', [LoginController, 'index']).middleware(middleware.userInput())
router
  .group(() => {
    router.get('clientes', [ClientesController, 'index'])
    router.get('clientes/show/:id', [ClientesController, 'show'])
    router
      .post('clientes/store', [ClientesController, 'store'])
      .middleware(middleware.clienteInput())
    router.put('clientes/update/:id', [ClientesController, 'update'])
    router.delete('clientes/delete/:id', [ClientesController, 'delete'])
    router.get('categorias', [CategoriasController, 'index'])
    router
      .post('categorias/store', [CategoriasController, 'store'])
      .middleware(middleware.categoriaInput())
    router.get('produtos', [ProdutosController, 'index'])
    router.get('produtos/show/:id', [ProdutosController, 'show'])
    router
      .post('produtos/store', [ProdutosController, 'store'])
      .middleware(middleware.produtoInput())
    router.put('produtos/update/:id', [ProdutosController, 'update'])
  })
  .middleware(middleware.auth())
