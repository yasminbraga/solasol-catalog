import Factory from '@ioc:Adonis/Lucid/Factory'
import Catalog from 'App/Models/Catalog'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import User from 'App/Models/User'
import File from 'App/Models/File'
import { DateTime } from 'luxon'
import Customer from 'App/Models/Customer'
import Order from 'App/Models/Order'

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
  .relation('user', () => UserFactory)
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
    available: true,
  }
})
  .state('notAvailable', (product) => {
    product.available = false
  })
  .relation('category', () => CategoryFactory)
  .relation('file', () => FileFactory)
  .build()

export const FileFactory = Factory.define(File, ({ faker }) => {
  return {
    secureUrl: faker.image.imageUrl(300, 300, 'tech', true, true),
    publicId: faker.random.alphaNumeric(10),
  }
})
  .relation('product', () => ProductFactory)
  .build()

export const CustomerFactory = Factory.define(Customer, ({ faker }) => {
  return {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    phone: faker.phone.phoneNumber(),
  }
}).build()

export const OrderFactory = Factory.define(Order, ({ faker }) => {
  return {
    closed: false,
    confirmed: false,
    uuid: faker.datatype.uuid(),
  }
})
  .relation('user', () => UserFactory)
  .relation('customer', () => CustomerFactory)
  .relation('products', () => ProductFactory)
  .state('closed', (order) => {
    order.closed = true
    order.closedAt = DateTime.now()
  })
  .state('confirmed', (order) => {
    order.confirmed = true
    order.confirmedAt = DateTime.now()
  })
  .state('open', (order) => {
    order.closed = false
  })
  .build()
