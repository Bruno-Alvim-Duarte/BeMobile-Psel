import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'enderecos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('rua').notNullable()
      table.integer('numero').notNullable()
      table.string('bairro').notNullable()
      table.string('cidade').notNullable()
      table.string('estado').notNullable()
      table.string('cep').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
