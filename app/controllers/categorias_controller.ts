import Categoria from '#models/categoria'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriasController {
  async index({ response }: HttpContext) {
    const categories = await Categoria.all()
    return response.status(200).json(categories)
  }
  async store({ request, response }: HttpContext) {
    const data = request.only(['nome'])
    const categoryExists = await Categoria.findBy('nome', data.nome)
    if (categoryExists) {
      return response
        .status(422)
        .json({ message: `Essa categoria já existe com o id: ${categoryExists.id}` })
    }
    const category = await Categoria.create(data)
    return response.status(201).json(category)
  }
}
