import test from 'japa'

import Database from '@ioc:Adonis/Lucid/Database'
import { OrderFactory, ProductFactory } from 'Database/factories'
import { api } from '../../../utils'

test.group('Api CloseOrdersController', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('should PUT in /api/v1/close-orders/:id fill totalPrice order property', async (assert) => {
    const order = await OrderFactory.apply('open').create()
    const [product1, product2] = await ProductFactory.merge({
      price: 10,
    }).createMany(2)

    await order.related('products').attach({
      [product1.id]: { quantity: 2 },
      [product2.id]: { quantity: 2 },
    })

    const url = `/v1/close-orders/${order.uuid}`
    const response = await api.put(url).set('Accept', 'application/json').expect(200)
    await order.refresh()

    assert.equal(order.totalPrice, 40.0)

    assert.isTrue(order.closed)
    assert.exists(order.closedAt)
    assert.exists(response.body.order)
  })

  test('should PUT in /api/v1/close-orders/:id close a order by uuid', async (assert) => {
    const order = await OrderFactory.apply('open').create()

    assert.isFalse(order.closed)
    const url = `/v1/close-orders/${order.uuid}`
    const response = await api.put(url).set('Accept', 'application/json').expect(200)
    await order.refresh()

    assert.isTrue(order.closed)
    assert.exists(order.closedAt)
    assert.exists(response.body.order)
  })

  test("should PUT in /api/v1/close-orders/:id return an error if order doesn't exists", async () => {
    const order = {
      uuid: 'd46827d4-3046-4735-a077-b58abaed2ca5',
    }

    const url = `/v1/close-orders/${order.uuid}`

    await api.put(url).set('Accept', 'application/json').expect(404)
  })
})
