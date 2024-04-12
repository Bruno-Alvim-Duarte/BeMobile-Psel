import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'
import { createUserValidator } from '#validators/user'

export default class UsersController {
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
