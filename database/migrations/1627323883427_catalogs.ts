import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Catalogs extends BaseSchema {
  protected tableName = 'catalogs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('expire_at').notNullable()
      table.integer('validity').notNullable()
      table.boolean('expired').defaultTo(false)
      table.uuid('uuid').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('views').defaultTo(0)
      table.integer('customer_id').unsigned().references('id').inTable('customers')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
