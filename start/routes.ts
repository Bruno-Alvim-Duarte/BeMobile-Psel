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
const VendasController = () => import('#controllers/vendas_controller')
const ProdutosController = () => import('#controllers/produtos_controller')
const CategoriasController = () => import('#controllers/categorias_controller')
const ClientesController = () => import('#controllers/clientes_controller')
const LoginController = () => import('#controllers/login_controller')

router.post('/signup', [UsersController, 'store'])
router.post('/login', [LoginController, 'index'])
router
  .group(() => {
    router.get('clientes', [ClientesController, 'index'])
    router.get('clientes/show/:id', [ClientesController, 'show'])
    router.post('clientes/store', [ClientesController, 'store'])
    router.put('clientes/update/:id', [ClientesController, 'update'])
    router.delete('clientes/delete/:id', [ClientesController, 'delete'])
    router.get('categorias', [CategoriasController, 'index'])
    router.post('categorias/store', [CategoriasController, 'store'])
    router.get('produtos', [ProdutosController, 'index'])
    router.get('produtos/show/:id', [ProdutosController, 'show'])
    router.post('produtos/store', [ProdutosController, 'store'])
    router.put('produtos/update/:id', [ProdutosController, 'update'])
    router.delete('produtos/delete/:id', [ProdutosController, 'delete'])
    router.post('vendas/store', [VendasController, 'store'])
  })
  .middleware(middleware.auth())
