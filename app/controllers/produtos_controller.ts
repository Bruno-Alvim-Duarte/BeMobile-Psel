import Produto from '#models/produto'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProdutosController {
  async index({ response }: HttpContext) {
    const products = await Produto.query()
      .from('produtos')
      .select('id', 'preco', 'nome')
      .orderBy('nome')
    return response.status(200).json(products)
  }

  async show({ params, response }: HttpContext) {
    const product = await Produto.query().where('id', params.id).preload('categorias')
    return response.status(200).json(product)
  }
}
