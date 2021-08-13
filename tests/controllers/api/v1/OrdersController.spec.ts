import test from 'japa'

import Database from '@ioc:Adonis/Lucid/Database'
import { CatalogFactory, CustomerFactory } from 'Database/factories'
import { api } from '../../../utils'
import Customer from 'App/Models/Customer'
import Catalog from 'App/Models/Catalog'

test.group('ApiOrdersController', (group) => {
  let catalog: Catalog

  group.before(async () => {
    await Database.beginGlobalTransaction()

    catalog = await CatalogFactory.create()
  })

  group.after(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('should POST in /api/v1/catalogs/:catalog_id/orders creates a new order', async (assert) => {
    const url = `/v1/catalogs/${catalog.uuid}/orders`
    let customers = await Customer.all()

    assert.lengthOf(customers, 0)

    const response = await api.post(url).set('Accept', 'application/json').send({
      name: 'Dalton Felipe',
      email: 'daltonphellipe@gmail.com',
      phone: '991924014',
    })

    customers = await Customer.all()
    assert.lengthOf(customers, 1)

    assert.equal(response.status, 200)
    assert.exists(response.body.order)
    assert.property(response.body.order, 'uuid')
  })

  test.only('should POST in /api/v1/catalogs/:catalog_id/orders not duplicate customer if already exists', async (assert) => {
    const url = `/v1/catalogs/${catalog.uuid}/orders`
    let customer = await CustomerFactory.create()

    const response = await api.post(url).set('Accept', 'application/json').send({
      name: 'Dalton',
      email: 'daltonphellipe@gmail.com',
      phone: customer.phone,
    })

    const customers = await Customer.all()
    assert.lengthOf(customers, 1)

    assert.equal(response.status, 200)
    assert.exists(response.body.order)
    assert.property(response.body.order, 'uuid')
  })
})
