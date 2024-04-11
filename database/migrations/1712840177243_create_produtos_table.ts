import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'produtos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.float('preco').notNullable()
      table.integer('quantidade_em_estoque').notNullable()
      table.string('nome').notNullable()
      table.string('descricao').nullable()
      table.string('imagem_url').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
