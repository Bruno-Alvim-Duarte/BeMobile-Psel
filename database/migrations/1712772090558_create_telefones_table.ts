import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'telefones'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('numero').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
