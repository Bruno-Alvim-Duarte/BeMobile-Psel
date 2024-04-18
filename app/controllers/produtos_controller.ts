import Categoria from '#models/categoria'
import Produto from '#models/produto'
import { softDelete } from '#services/soft_delete'
import { createProdutoValidator, updateProdutoValidator } from '#validators/produto'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProdutosController {
  /**
   * @index
   * @summary Retorna as principais informações de todos os produtos
   * @description Retorna as principais informações de todos os produtos
   * @responseBody 200 - <Produto[]>.only(id, preco, nome)
   */
  async index({ response }: HttpContext) {
    const products = await Produto.query()
      .from('produtos')
      .select('id', 'preco', 'nome')
      .orderBy('nome')
    return response.status(200).json(products)
  }
  /**
   * @show
   * @summary Retorna detalhadamente as informações de um produto específico
   * @description Retorna detalhadamente as informações de um produto específico
   * @responseBody 200 - <Produto[]>.with(categorias)
   */
  async show({ params, response }: HttpContext) {
    const product = await Produto.query().where('id', params.id).preload('categorias')
    return response.status(200).json(product)
  }

  /**
   * @store
   * @summary Cria um Produto e o retorna
   * @description Cria um Produto e o retorna
   * @responseBody 201 - <Produto>.with(categorias)
   * @requestBody <Produto>.exclude(id).append("categorias_ids": [1,2,3])
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createProdutoValidator)

    const product = await Produto.create({
      nome: payload.nome,
      descricao: payload.descricao,
      preco: payload.preco,
      imagemUrl: payload.imagem_url,
      quantidadeEmEstoque: payload.quantidade_em_estoque,
    })

    // Transformar o array pra Set pra garantir que não vamos registrar ids duplicados
    const categoriasIdsWithoutRepeat = [...new Set<number>(payload.categorias_ids)]
    if (categoriasIdsWithoutRepeat && categoriasIdsWithoutRepeat.length > 0) {
      // Para cada item do set de categoria preciso checkar se ele existe de fato
      categoriasIdsWithoutRepeat.forEach(async (categoriaId) => {
        const categoryExists = Categoria.find(categoriaId)
        if (!categoryExists) {
          return response.status(422).json({
            message: `Não existe uma categoria com esse id: ${categoriaId}, por favor registre todas as categorias primeiro`,
          })
        }
      })
      // criando a relação do produto com as categorias na tabela de relacionamento
      await product.related('categorias').attach(categoriasIdsWithoutRepeat)
    }

    const productWithCategories = await Produto.query()
      .where('id', product.id)
      .preload('categorias')
    return response.status(201).json(productWithCategories)
  }
  /**
   * @update
   * @summary Atualiza um produto e o retorna atualizado
   * @description Atualiza um produto e o retorna atualizado OBS: todos os dados são opcionais ele so vai atualizar os que você colocar
   * @responseBody 200 - <Produto>.with(categorias)
   * @requestBody <Produto>.exclude(id).append("categorias_ids": [1,2,3])
   */
  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateProdutoValidator)

    const product = await Produto.find(params.id)
    if (!product) {
      return response.status(404).json({ message: 'Produto não encontrado' })
    }
    product.preco = payload.preco || product.preco
    product.quantidadeEmEstoque = payload.quantidade_em_estoque || product.quantidadeEmEstoque
    product.nome = payload.nome || product.nome
    product.descricao = payload.descricao || product.descricao
    product.imagemUrl = payload.imagem_url || product.imagemUrl

    const categoriasIdsWithoutRepeat = [...new Set<number>(payload.categorias_ids)]
    if (payload.categorias_ids && payload.categorias_ids.length > 0) {
      categoriasIdsWithoutRepeat.forEach(async (categoriaId) => {
        const categoryExists = Categoria.find(categoriaId)
        if (!categoryExists) {
          return response.status(422).json({
            message: `Não existe uma categoria com esse id: ${categoriaId}, por favor registre todas as categorias primeiro`,
          })
        }
      })
    }

    await product.related('categorias').detach()
    await product.related('categorias').attach(categoriasIdsWithoutRepeat)

    await product.save()
    const productWithCategories = await Produto.query()
      .where('id', product.id)
      .preload('categorias')
    console.log(productWithCategories)
    return response.status(200).json(productWithCategories)
  }

  /**
   * @deleteProduct
   * @summary Faz o Soft Delete de um Produto
   * @description Faz o Soft Delete de um Produto
   * @responseBody 204
   */

  async delete({ params, response }: HttpContext) {
    const product = await Produto.find(params.id)
    if (!product) {
      return response.status(404).json({ message: 'Produto não encontrado' })
    }
    await softDelete(product, 'deletedAt')
    return response.status(204)
  }
}
