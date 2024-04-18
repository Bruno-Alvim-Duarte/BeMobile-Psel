import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import TokenGenerator from '../../utils/token_generator.js'
import Token from '#models/token'
import { createUserValidator } from '#validators/user'

export default class LoginController {
  constructor(private tokenGenerator = new TokenGenerator()) {}

  /**
   * @index
   * @summary Faz o login na aplicação e retorna um token JWT pra utilizar como autorização
   * @description Faz o login na aplicação e retorna um token JWT pra utilizar como autorização
   * @responseBody 200 - {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJydW5vQGdtYWlsLmNvbSIsImlhdCI6MTcxMzE5Mjg4NX0.K6tAscoqGxG02cCImA3Z2qBnDpGzO9tC9sUqLYgMBhM"}
   * @requestBody <User>.only(email, senha)
   */
  async index({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const user = await User.findBy('email', payload.email)
    if (!user) {
      return response.status(400).json({ message: 'Email ou senha inválidos' })
    }
    const isCorrectPass = await hash.verify(user.senha, payload.senha)
    if (!isCorrectPass) {
      return response.status(400).json({ message: 'Email ou senha inválidos' })
    }
    const token = await this.tokenGenerator.generateToken({ email: user.email })
    await Token.create({ token, userId: user.id })
    return response.status(200).json({ token })
  }
}
