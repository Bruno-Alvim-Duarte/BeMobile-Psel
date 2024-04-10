import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Token from './token.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Endereco from './endereco.js'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare cpf: string

  @hasMany(() => Token)
  declare tokens: HasMany<typeof Token>

  @hasOne(() => Endereco)
  declare endereco: HasOne<typeof Endereco>
}
