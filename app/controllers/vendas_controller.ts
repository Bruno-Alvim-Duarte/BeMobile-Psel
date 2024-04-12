import Cliente from '#models/cliente'
import Produto from '#models/produto'
import Venda from '#models/venda'
import { createVendaValidator } from '#validators/venda'
import type { HttpContext } from '@adonisjs/core/http'

export default class VendasController {
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createVendaValidator)
    const product = await Produto.find(payload.produto_id)
    if (!product) {
      return response.status(404).json({ message: 'Produto não encontrado' })
    }
    const client = await Cliente.find(payload.cliente_id)
    if (!client) {
      return response.status(404).json({ message: 'Cliente não encontrado' })
    }
    const precoTotal = (product.preco * payload.quantidade).toFixed(2)
    const sale = await Venda.create({
      clienteId: payload.cliente_id,
      produtoId: payload.produto_id,
      quantidade: payload.quantidade,
      preco_unitario: product.preco,
      preco_total: Number.parseFloat(precoTotal),
    })
    return response.status(201).json(sale)
  }
}
