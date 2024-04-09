import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'

export default class UsersController {
  async createUser({ request, response }: HttpContext) {
    try {
      const data = request.only(['email', 'senha'])

      const userExists = await User.findBy('email', data.email)
      if (userExists) {
        return response.status(400).json({ message: 'Este usuário já está cadastrado' })
      }
      const user = await User.create(data)

      return response.status(200).json(user)
    } catch (e: any) {
      return response.status(500).json({ message: e.message })
    }
  }
}
