import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Cliente from './cliente.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Produto from './produto.js'

export default class Venda extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare clienteId: number

  @belongsTo(() => Cliente)
  declare cliente: BelongsTo<typeof Cliente>

  @column()
  declare produtoId: number

  @belongsTo(() => Produto)
  declare produto: BelongsTo<typeof Produto>

  @column()
  declare quantidade: number

  @column()
  declare preco_unitario: number

  @column()
  declare preco_total: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
