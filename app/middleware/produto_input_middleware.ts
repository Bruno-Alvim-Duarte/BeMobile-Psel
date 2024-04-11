import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export default class ProdutoInputMiddleware {
  async handle({ request }: HttpContext, next: NextFn) {
    const data = request.only([
      'preco',
      'quantidade_em_estoque',
      'nome',
      'descricao',
      'imagem_url',
      'categorias_ids',
    ])

    const schema = vine.object({
      nome: vine.string(),
      preco: vine.number().min(1),
      quantidade_em_estoque: vine.number().min(0),
      descricao: vine.string().optional(),
      imagem_url: vine.string().optional(),
      categorias_ids: vine.array(vine.number()).optional(),
    })

    vine.messagesProvider = new SimpleMessagesProvider({
      required: 'O {{ field }} é obrigatório',
      min: 'O {{ field }} não é um valor váldio',
    })

    await vine.validate({ schema, data })
    return next()
  }
}
