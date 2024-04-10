import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Telefone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare numero: string
  @column()
  declare userId: number
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
