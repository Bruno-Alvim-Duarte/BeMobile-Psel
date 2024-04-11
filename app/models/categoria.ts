import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Produto from './produto.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Categoria extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @manyToMany(() => Produto)
  declare produtos: ManyToMany<typeof Produto>
}
