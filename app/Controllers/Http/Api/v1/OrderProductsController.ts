import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Order from 'App/Models/Order'

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
}
