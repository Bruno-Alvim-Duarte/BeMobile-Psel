import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare rua: string
  @column()
  declare numero: number
  @column()
  declare bairro: string
  @column()
  declare cidade: string
  @column()
  declare estado: string
  @column()
  declare cep: number
  @column()
  declare userId: number
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
