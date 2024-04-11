import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categoria_produto'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('categoria_id').unsigned().index()
      table.integer('produto_id').unsigned().index()
      table.foreign('categoria_id').references('id').inTable('categorias').onDelete('cascade')
      table.foreign('produto_id').references('id').inTable('produtos').onDelete('cascade')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
