import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import TokenGenerator from '../../utils/token_generator.js'
import Token from '#models/token'

export default class AuthMiddleware {
  constructor(private tokenGenerator = new TokenGenerator()) {}

  async handle({ request, response }: HttpContext, next: NextFn) {
    const { authorization } = request.headers()
    if (!authorization) {
      return response.status(401).json({ message: 'Acesso não autorizado' })
    }
    try {
      await this.tokenGenerator.verifyToken(authorization)
    } catch (e) {
      return response.status(401).json({ message: 'Acesso não autorizado' })
    }
    const tokenInDb = await Token.findBy('token', authorization)
    if (!tokenInDb || tokenInDb.isRevoked) {
      return response.status(401).json({ message: 'Acesso não autorizado' })
    }
    return next()
  }
}
