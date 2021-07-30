import Factory from '@ioc:Adonis/Lucid/Factory'
import Catalog from 'App/Models/Catalog'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import User from 'App/Models/User'
import File from 'App/Models/File'
import { DateTime } from 'luxon'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password: '123456',
  }
})
  .state('admin', (user) => {
    user.isAdmin = true
  })
  .relation('catalogs', () => CatalogFactory)
  .build()

export const CatalogFactory = Factory.define(Catalog, ({ faker }) => {
  return {
    expireAt: DateTime.now().plus({ days: 3 }),
    uuid: faker.datatype.uuid(),
    validity: 3,
    expired: false,
  }
})
  .state('expired', (catalog) => {
    catalog.expired = true
    catalog.expireAt = DateTime.now()
  })
  .build()

export const CategoryFactory = Factory.define(Category, ({ faker }) => {
  return {
    name: faker.commerce.productAdjective(),
  }
})
  .relation('products', () => ProductFactory)
  .build()

export const ProductFactory = Factory.define(Product, ({ faker }) => {
  return {
    name: faker.commerce.productName(),
    codigo: faker.random.alphaNumeric(6),
    price: faker.datatype.float({ max: 999, min: 0, precision: 2 }),
    description: faker.commerce.productDescription(),
  }
})
  .relation('category', () => CategoryFactory)
  .relation('file', () => FileFactory)
  .build()

export const FileFactory = Factory.define(File, ({ faker }) => {
  return {
    filename: faker.image.imageUrl(800, 800, 'tech', true, true),
  }
})
  .relation('product', () => ProductFactory)
  .build()
