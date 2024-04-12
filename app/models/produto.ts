import { BaseModel, beforeFetch, beforeFind, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Categoria from './categoria.js'
import { DateTime } from 'luxon'
import { softDeleteQuery } from '#services/soft_delete'

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare nome: string
  @column()
  declare descricao: string
  @column()
  declare preco: number
  @column()
  declare quantidadeEmEstoque: number
  @column()
  declare imagemUrl: string
  @manyToMany(() => Categoria)
  declare categorias: ManyToMany<typeof Categoria>
  @column.dateTime({ serializeAs: null })
  deletedAt?: DateTime
  @beforeFind()
  static softDeletesFind = softDeleteQuery
  @beforeFetch()
  static softDeletesFetch = softDeleteQuery
}
