import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrderProducts extends BaseSchema {
  protected tableName = 'order_product'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('order_id').unsigned().references('id').inTable('orders')
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.integer('quantity').notNullable().defaultTo(1)

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
