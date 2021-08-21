import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.decimal('total_price')
      table.boolean('closed').notNullable().defaultTo(false)
      table.timestamp('closed_at')
      table.boolean('confirmed').notNullable().defaultTo(false)
      table.timestamp('confirmed_at')
      table.uuid('uuid').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('customer_id').unsigned().references('id').inTable('customers')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
