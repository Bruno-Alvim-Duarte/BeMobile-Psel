import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export default class ClienteInputMiddleware {
  async handle({ request }: HttpContext, next: NextFn) {
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
    const schema = vine.object({
      nome: vine.string(),
      cpf: vine.string().fixedLength(11),
      telefone: vine.string().mobile(),
      rua: vine.string(),
      numero: vine.number().min(0),
      bairro: vine.string(),
      cidade: vine.string(),
      estado: vine.string(),
      cep: vine.string().fixedLength(8),
    })

    vine.messagesProvider = new SimpleMessagesProvider({
      required: 'O {{ field }} é obrigatório',
      mobile: 'O telefone não é um número válido',
      fixedLength: 'O {{ field }} deve ser válido',
      min: 'O número do endereço deve ser maior que 0',
    })

    await vine.validate({ schema, data })
    return next()
  }
}
