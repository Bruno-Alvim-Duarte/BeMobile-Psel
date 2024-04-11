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
}
