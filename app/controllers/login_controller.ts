import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import TokenGenerator from '../../utils/token_generator.js'
import Token from '#models/token'

export default class LoginController {
  constructor(private tokenGenerator = new TokenGenerator()) {}

  async index({ request, response }: HttpContext) {
    const { email, senha } = request.all()
    const user = await User.findBy('email', email)
    if (!user) {
      return response.status(400).json({ message: 'Email ou senha inválidos' })
    }
    const isCorrectPass = await hash.verify(user.senha, senha)
    if (!isCorrectPass) {
      return response.status(400).json({ message: 'Email ou senha inválidos' })
    }
    const token = await this.tokenGenerator.generateToken({ email: user.email })
    await Token.create({ token, userId: user.id })
    return response.status(200).json({ token })
  }
}
