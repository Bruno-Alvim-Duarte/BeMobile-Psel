import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export default class UserInputMiddleware {
  async handle({ request }: HttpContext, next: NextFn) {
    const data = request.only(['email', 'senha'])

    const schema = vine.object({
      email: vine.string().email(),
      senha: vine.string().minLength(6),
    })

    vine.messagesProvider = new SimpleMessagesProvider({
      required: 'O {{ field }} é obrigatório',
      email: 'O email não é um email válido',
      minLength: 'A senha deve ter pelo menos 6 caracteres',
    })

    await vine.validate({ schema, data })
    await next()
  }
}
