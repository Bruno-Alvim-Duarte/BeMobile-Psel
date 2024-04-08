import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'
import vine from '@vinejs/vine'

export default class InputMiddleware {
  async userSignup({ request }: HttpContext, next: NextFn) {
    const data = request.only(['email', 'senha'])

    const schema = vine.object({
      email: vine.string().email(),
      senha: vine.string().minLength(6),
    })

    await vine.validate({ schema, data })
    next()
  }
}
