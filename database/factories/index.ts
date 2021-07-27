import Factory from '@ioc:Adonis/Lucid/Factory'
import Catalog from 'App/Models/Catalog'
import User from 'App/Models/User'
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
