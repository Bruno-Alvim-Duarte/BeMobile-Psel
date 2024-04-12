import vine from '@vinejs/vine'

export const createCategoriaValidator = vine.compile(
  vine.object({
    nome: vine.string(),
  })
)
