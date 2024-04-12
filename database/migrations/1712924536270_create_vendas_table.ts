import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vendas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cliente_id').unsigned()
      table.integer('produto_id').unsigned()
      table.foreign('cliente_id').references('id').inTable('clientes').onDelete('cascade')
      table.foreign('produto_id').references('id').inTable('produtos').onDelete('cascade')
      table.integer('quantidade')
      table.float('preco_unitario')
      table.float('preco_total')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
