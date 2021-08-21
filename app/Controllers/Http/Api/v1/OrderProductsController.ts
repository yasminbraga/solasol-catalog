import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Order from 'App/Models/Order'
import OrderProduct from 'App/Models/OrderProduct'

export default class OrderProductsController {
  public async store({ request, response, logger }: HttpContextContract) {
    const validationSchema = schema.create({
      product: schema.object().members({
        id: schema.number(),
        quantity: schema.number(),
      }),
    })

    const { product } = await request.validate({
      schema: validationSchema,
    })

    const orderUuid = request.param('order_id')

    try {
      const order = await Order.query().where('uuid', orderUuid).preload('products').firstOrFail()

      const productExists = await OrderProduct.query()
        .where({
          orderId: order.id,
          productId: product.id,
        })
        .first()

      if (productExists) {
        return response.conflict({
          errors: [{ message: 'Product already exists' }],
        })
      }

      await order.related('products').attach({
        [product.id]: {
          quantity: product.quantity,
        },
      })

      await order.load('products')

      return {
        order: order.toJSON(),
      }
    } catch (error) {
      logger.error(error)
      return response.notFound({
        errors: [{ message: error.message }],
      })
    }
  }

  public async update({ request, response, logger }: HttpContextContract) {
    const validationSchema = schema.create({
      quantity: schema.number(),
    })

    const { quantity } = await request.validate({
      schema: validationSchema,
    })

    const orderUuid = request.param('order_id')
    const productId = request.param('id')

    try {
      const order = await Order.query().where('uuid', orderUuid).firstOrFail()

      await OrderProduct.query()
        .where({
          orderId: order.id,
          productId,
        })
        .update({
          quantity,
        })

      await order.load('products')

      return {
        order: order.toJSON(),
      }
    } catch (error) {
      logger.error(error)
      return response.notFound({
        errors: [{ message: error.message }],
      })
    }
  }

  public async destroy({ request, response, logger }: HttpContextContract) {
    const orderUuid = request.param('order_id')
    const productId = request.param('id')

    try {
      const order = await Order.query().where('uuid', orderUuid).firstOrFail()

      await OrderProduct.query()
        .where({
          orderId: order.id,
          productId,
        })
        .delete()

      await order.load('products')

      return {
        order: order.toJSON(),
      }
    } catch (error) {
      logger.error(error)
      return response.notFound({
        errors: [{ message: error.message }],
      })
    }
  }
}
