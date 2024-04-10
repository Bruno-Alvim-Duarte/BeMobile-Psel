import IPayload from '../interfaces/payload.js'
import ITokenGenerator from '../interfaces/token_generator.js'
import { JWT } from 'node-jsonwebtoken'

export default class TokenGenerator implements ITokenGenerator {
  private generator = new JWT<IPayload>('jwt_secret')
  generateToken(payload: { email: string }): Promise<string> {
    return this.generator.sign(payload)
  }
  verifyToken(token: string): Promise<IPayload> {
    return this.generator.verify(token)
  }
}
