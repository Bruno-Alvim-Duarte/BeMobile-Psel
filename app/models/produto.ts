import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Categoria from './categoria.js'

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare preco: number
  @column()
  declare quantidadeEmEstoque: number
  @column()
  declare nome: string
  @column()
  declare descricao: string
  @column()
  declare imagemUrl: string
  @manyToMany(() => Categoria)
  declare categorias: ManyToMany<typeof Categoria>
}
