import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'
import { createUserValidator } from '#validators/user'

export default class UsersController {
  /**
   * @store
   * @summary Cria um usuário no banco de dados da aplicação
   * @description Cria um usuário no banco de dados da aplicação
   * @responseBody 200 - <User>
   * @requestBody <User>.only(email, senha)
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const userExists = await User.findBy('email', payload.email)
    if (userExists) {
      return response.status(400).json({ message: 'Este usuário já está cadastrado' })
    }
    const user = await User.create(payload)

    return response.status(200).json(user)
  }
}
