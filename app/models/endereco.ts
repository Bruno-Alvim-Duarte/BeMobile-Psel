import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Cliente from './cliente.js'

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
  declare cep: string
  @column()
  declare clienteId: number
  @belongsTo(() => Cliente)
  declare cliente: BelongsTo<typeof Cliente>
}
