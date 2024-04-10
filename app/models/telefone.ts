import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Cliente from './cliente.js'

export default class Telefone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare numero: string
  @column()
  declare userId: number
  @belongsTo(() => Cliente)
  declare user: BelongsTo<typeof Cliente>
}
