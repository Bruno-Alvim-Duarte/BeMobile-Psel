import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export default class CategoriaInputMiddleware {
  async handle({ request }: HttpContext, next: NextFn) {
    const data = request.only(['nome'])

    const schema = vine.object({
      nome: vine.string(),
    })

    vine.messagesProvider = new SimpleMessagesProvider({
      required: 'O {{ field }} é obrigatório',
    })

    await vine.validate({ data, schema })
    return next()
  }
}
