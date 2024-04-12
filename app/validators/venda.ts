import vine from '@vinejs/vine'

export const createVendaValidator = vine.compile(
  vine.object({
    produto_id: vine.number(),
    cliente_id: vine.number(),
    quantidade: vine.number().min(1),
  })
)
