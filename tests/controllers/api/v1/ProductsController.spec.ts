import test from 'japa'

import Database from '@ioc:Adonis/Lucid/Database'
import { ProductFactory } from 'Database/factories'
import { api } from '../../../utils'

test.group('Api ProductsController', (group) => {
  group.before(async () => {
    await Database.beginGlobalTransaction()
  })

  group.after(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test.only('should GET in /api/v1/products return a list of products with available status', async (assert) => {
    await ProductFactory.createMany(40)
    await ProductFactory.apply('notAvailable').createMany(5)

    const url = `/v1/products`
    const response = await api.get(url).set('Accept', 'application/json')

    assert.equal(response.status, 200)
    assert.exists(response.body.products)
    assert.propertyVal(response.body.products.meta, 'current_page', 1)
    assert.propertyVal(response.body.products.meta, 'total', 40)
  })

  test('should GET in /api/v1/products return a list of products according to the page and limit defineds by qs', async (assert) => {
    await ProductFactory.createMany(40)

    const url = `/v1/products`

    const response = await api.get(url).set('Accept', 'application/json').query({
      page: 2,
      limit: 10,
    })

    assert.equal(response.status, 200)
    assert.exists(response.body.products)
    assert.propertyVal(response.body.products.meta, 'current_page', 2)
  })
})
