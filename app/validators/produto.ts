import vine from '@vinejs/vine'

export const updateProdutoValidator = vine.compile(
  vine.object({
    nome: vine.string().optional(),
    preco: vine.number().min(1).optional(),
    quantidade_em_estoque: vine.number().min(0).optional(),
    descricao: vine.string().optional(),
    imagem_url: vine.string().optional(),
    categorias_ids: vine.array(vine.number()).optional(),
  })
)
