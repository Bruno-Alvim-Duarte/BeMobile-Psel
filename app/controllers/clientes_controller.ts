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
    const client = await Cliente.create({ cpf: data.cpf, nome: data.nome })
    await Endereco.create({
      rua: data.rua,
      numero: data.numero,
      bairro: data.bairro,
      cidade: data.cidade,
      estado: data.estado,
      cep: data.cep,
      clienteId: client.id,
    })
    await Telefone.create({
      numero: data.telefone,
      clienteId: client.id,
    })

    return response
      .status(201)
      .json(
        await Cliente.query()
          .where('id', client.id)
          .preload('telefones')
          .preload('endereco')
          .firstOrFail()
      )
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.only([
      'nome',
      'telefone',
      'rua',
      'numero',
      'bairro',
      'cidade',
      'estado',
      'cep',
    ])

    const client = await Cliente.find(params.id)
    if (!client) {
      return response.status(404).json({ message: 'Cliente não encontrado' })
    }
    const endereco = await Endereco.findBy('cliente_id', params.id)
    client.nome = data.nome || client.nome
    // Quando se faz um update de um número de telefone se adiciona mais um. Não faz sentido substituir o número de telefone
    // se um cliente pode ter mais de um número de telefone
    data.telefone && (await Telefone.create({ clienteId: params.id, numero: data.telefone }))
    endereco!.rua = data.rua || endereco!.rua
    endereco!.numero = data.numero || endereco!.numero
    endereco!.bairro = data.bairro || endereco!.bairro
    endereco!.cidade = data.cidade || endereco!.cidade
    endereco!.estado = data.estado || endereco!.estado
    endereco!.cep = data.cep || endereco!.cep

    await client.save()
    await endereco!.save()

    return Cliente.query()
      .where('id', client.id)
      .preload('telefones')
      .preload('endereco')
      .firstOrFail()
  }

  async delete({ params, response }: HttpContext) {
    const client = await Cliente.find(params.id)
    if (!client) {
      return response.status(404).json({ message: 'Cliente não encontrado' })
    }

    const endereco = await Endereco.findBy('cliente_id', params.id)
    await endereco!.delete()
    const telefones = await Telefone.findManyBy('cliente_id', params.id)
    telefones.forEach(async (telefone) => await telefone.delete())
    await client.delete()
    return response.status(204)
  }
}
