import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CategoryFactory } from 'Database/factories'

export default class ProductSeeder extends BaseSeeder {
  public async run() {
    await CategoryFactory.with('products', 10, (productFactory) => {
      productFactory.with('file', 1)
    }).createMany(5)
  }
}
