import vine from '@vinejs/vine'

export const createClienteValidator = vine.compile(
  vine.object({
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
)

export const updateClienteValidator = vine.compile(
  vine.object({
    nome: vine.string().optional(),
    cpf: vine.string().fixedLength(11).optional(),
    telefone: vine.string().mobile().optional(),
    rua: vine.string().optional(),
    numero: vine.number().min(0).optional(),
    bairro: vine.string().optional(),
    cidade: vine.string().optional(),
    estado: vine.string().optional(),
    cep: vine.string().fixedLength(8).optional(),
  })
)
