import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Endereco from './endereco.js'
import Telefone from './telefone.js'
import Venda from './venda.js'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare cpf: string

  @hasOne(() => Endereco)
  declare endereco: HasOne<typeof Endereco>

  @hasMany(() => Telefone)
  declare telefones: HasMany<typeof Telefone>

  @hasMany(() => Venda)
  declare vendas: HasMany<typeof Venda>
}
