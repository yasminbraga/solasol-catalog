import test from 'japa'

import Database from '@ioc:Adonis/Lucid/Database'
import { CatalogFactory, CustomerFactory, OrderFactory } from 'Database/factories'
import { api } from '../../../utils'
import Customer from 'App/Models/Customer'

test.group('ApiOrdersController', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('should POST in /api/v1/orders?catalogId creates a new order', async (assert) => {
    const catalog = await CatalogFactory.with('user', 1).create()
    const url = `/v1/orders`
    let customers = await Customer.all()

    assert.lengthOf(customers, 0)

    const response = await api
      .post(url)
      .set('Accept', 'application/json')
      .send({
        name: 'Dalton Felipe',
        email: 'daltonphellipe@gmail.com',
        phone: '991924014',
      })
      .query({
        catalogId: catalog.uuid,
      })

    customers = await Customer.all()
    assert.lengthOf(customers, 1)

    assert.equal(response.status, 200)
    assert.exists(response.body.order)
    assert.property(response.body.order, 'uuid')
  })

  test('should POST in /api/v1/orders?catalogId not duplicate customer if already exists', async (assert) => {
    const url = `/v1/orders`

    const catalog = await CatalogFactory.with('user', 1).create()
    const customer = await CustomerFactory.create()

    const response = await api
      .post(url)
      .set('Accept', 'application/json')
      .send({
        name: 'Dalton',
        email: 'daltonphellipe@gmail.com',
        phone: customer.phone,
      })
      .query({
        catalogId: catalog.uuid,
      })

    const customers = await Customer.all()
    assert.lengthOf(customers, 1)

    assert.equal(response.status, 200)
    assert.exists(response.body.order)
    assert.property(response.body.order, 'uuid')
  })

  test('should GET in /api/v1/orders/:uuid return order by uuid', async (assert) => {
    const order = await OrderFactory.with('customer').with('user').create()
    const url = `/v1/orders/${order.uuid}`

    const response = await api.get(url).set('Accept', 'application/json')

    assert.equal(response.status, 200)
    assert.exists(response.body.order)
    assert.property(response.body.order, 'uuid')
  })
})
