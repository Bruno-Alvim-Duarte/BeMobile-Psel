import Categoria from '#models/categoria'
import Produto from '#models/produto'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProdutosController {
  async index({ response }: HttpContext) {
    const products = await Produto.query()
      .from('produtos')
      .select('id', 'preco', 'nome')
      .orderBy('nome')
    return response.status(200).json(products)
  }

  async show({ params, response }: HttpContext) {
    const product = await Produto.query().where('id', params.id).preload('categorias')
    return response.status(200).json(product)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only([
      'preco',
      'quantidade_em_estoque',
      'nome',
      'descricao',
      'imagem_url',
      'categorias_ids',
    ])
    const product = await Produto.create({
      nome: data.nome,
      descricao: data.descricao,
      preco: data.preco,
      imagemUrl: data.imagem_url,
      quantidadeEmEstoque: data.quantidade_em_estoque,
    })

    if (data.categorias_ids && data.categorias_ids.length > 0) {
      // Transformar o array pra Set pra garantir que não vamos registrar ids duplicados
      const categoriasIdsWithoutRepeat = [...new Set(data.categorias_ids)]
      // Para cada item do set de categoria (que exista a categoria de fato), fazer a relação com o produto sendo criado
      categoriasIdsWithoutRepeat.forEach(async (categoriaId) => {
        const categoryExists = Categoria.find(categoriaId)
        if (!categoryExists && categoriaId !== null) {
          return response.status(422).json({
            message: `Não existe uma categoria com esse id: ${categoriaId}, por favor registre todas as categorias primeiro`,
          })
        }
        // Uso a função Number(categoriaId), so pra garantir pra tipagem que é do tipo number
        // porém a validação de que o que o usuário colocou é um array de numbers já esta sendo feita no middleware
        await product.related('categorias').attach([Number(categoriaId)])
      })
    }

    const productWithCategories = await Produto.query()
      .where('id', product.id)
      .preload('categorias')
    return response.status(201).json(productWithCategories)
  }
}
