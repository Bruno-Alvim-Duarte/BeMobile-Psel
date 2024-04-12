import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Cliente from './cliente.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Produto from './produto.js'

export default class Venda extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare clienteId: number

  @hasOne(() => Cliente)
  declare cliente: HasOne<typeof Cliente>

  @column()
  declare produtoId: number

  @hasOne(() => Produto)
  declare produto: HasOne<typeof Produto>

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
