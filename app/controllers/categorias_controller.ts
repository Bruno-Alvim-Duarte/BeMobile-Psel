import Categoria from '#models/categoria'
import { createCategoriaValidator } from '#validators/categoria'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriasController {
  async index({ response }: HttpContext) {
    const categories = await Categoria.all()
    return response.status(200).json(categories)
  }
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createCategoriaValidator)
    const categoryExists = await Categoria.findBy('nome', payload.nome)
    if (categoryExists) {
      return response
        .status(422)
        .json({ message: `Essa categoria já existe com o id: ${categoryExists.id}` })
    }
    const category = await Categoria.create(payload)
    return response.status(201).json(category)
  }
}
