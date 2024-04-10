import Cliente from '#models/cliente'
import Endereco from '#models/endereco'
import Telefone from '#models/telefone'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientesController {
  async index({ response }: HttpContext) {
    const clients = await Cliente.all()
    if (!clients.length) {
      return response.status(200).json({ message: 'Ainda não há usuários cadastrados' })
    }
    return response.status(200).json(clients)
  }

  async show({ params, response }: HttpContext) {
    const client = await Cliente.query()
      .where('id', params.id)
      .preload('telefones')
      .preload('endereco')
      .firstOrFail()
    return response.status(200).json(client)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only([
      'nome',
      'cpf',
      'telefone',
      'rua',
      'numero',
      'bairro',
      'cidade',
      'estado',
      'cep',
    ])
    const clienteExists = await Cliente.findBy('cpf', data.cpf)
    if (clienteExists) {
      return response
        .status(422)
        .json({ message: `Cliente já está cadastrado com o id: ${clienteExists.id}` })
    }
    const cliente = await Cliente.create({ cpf: data.cpf, nome: data.nome })
    await Endereco.create({
      rua: data.rua,
      numero: data.numero,
      bairro: data.bairro,
      cidade: data.cidade,
      estado: data.estado,
      cep: data.cep,
      clienteId: cliente.id,
    })
    await Telefone.create({
      numero: data.telefone,
      clienteId: cliente.id,
    })

    return Cliente.query()
      .where('id', cliente.id)
      .preload('telefones')
      .preload('endereco')
      .firstOrFail()
  }
}
