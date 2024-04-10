import IPayload from './payload.js'

// eslint-disable-next-line @typescript-eslint/naming-convention
export default interface ITokenGenerator {
  generateToken(payload: IPayload): Promise<string>
  verifyToken(token: string): Promise<IPayload>
}
