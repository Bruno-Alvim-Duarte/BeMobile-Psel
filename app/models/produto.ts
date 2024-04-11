import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare preco: number
  @column()
  declare quantidadeEmEstoque: number
  @column()
  declare nome: string
  @column()
  declare descricao: string
  @column()
  declare imagemUrl: string
}
