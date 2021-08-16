import test from 'japa'

import Database from '@ioc:Adonis/Lucid/Database'
import { OrderFactory, ProductFactory } from 'Database/factories'
import { apiV1 } from '../../../utils'

test.group('ApiOrderProductsController', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('should POST in /api/v1/orders/:order_id/products creates a new OrderProduct', async (assert) => {
    const order = await OrderFactory.create()
    const product = await ProductFactory.create()

    const response = await apiV1
      .post(`/orders/${order.uuid}/products`)
      .set('Accept', 'application/json')
      .send({
        product: {
          id: product.id,
          quantity: 12,
        },
      })
      .expect(200)

    assert.exists(response.body.order)
    assert.exists(response.body.order.products)
    assert.lengthOf(response.body.order.products, 1)
  })

  test('should POST in /api/v1/orders/:order_id/products returns 404 if order doesnt exist', async () => {
    await apiV1
      .post(`/orders/94nvt93ycn32c42x9m38c4943v5/products`)
      .set('Accept', 'application/json')
      .send({
        product: {
          id: 1,
          quantity: 1,
        },
      })
      .expect(404)
  })
})
