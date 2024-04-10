import Cliente from '#models/cliente'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientesController {
  async index({ response }: HttpContext) {
    const clients = await Cliente.all()
    if (!clients.length) {
      return response.status(200).json({ message: 'Ainda não há usuários cadastrados' })
    }
    return response.status(200).json(clients)
  }
}
