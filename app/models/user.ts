import hash from '@adonisjs/core/services/hash'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column()
  declare senha: string

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.senha) {
      user.senha = await hash.make(user.senha)
    }
  }
}
