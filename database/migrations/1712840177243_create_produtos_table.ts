import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'produtos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome').notNullable()
      table.string('descricao').nullable()
      table.float('preco').notNullable()
      table.integer('quantidade_em_estoque').notNullable()
      table.string('imagem_url').nullable()
      table.dateTime('deleted_at').defaultTo(null)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
