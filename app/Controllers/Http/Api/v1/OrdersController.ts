import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { v4 } from 'uuid'

import Catalog from 'App/Models/Catalog'
import Customer from 'App/Models/Customer'
import Order from 'App/Models/Order'
import Database from '@ioc:Adonis/Lucid/Database'

export default class OrdersController {
  public async store({ request, logger, response }: HttpContextContract) {
    const validationSchema = schema.create({
      name: schema.string(),
      email: schema.string.optional({}, [rules.email()]),
      phone: schema.string(),
    })

    const { catalogId } = request.qs()

    const { phone, email, name } = await request.validate({
      schema: validationSchema,
    })

    try {
      await Database.transaction(async (trx) => {
        const catalog = await Catalog.findByOrFail('uuid', catalogId, { client: trx })
        const customer = await Customer.firstOrCreate(
          { phone },
          { name, phone, email },
          { client: trx }
        )

        const order = await Order.create(
          {
            customerId: customer.id,
            userId: catalog.userId,
            uuid: v4(),
          },
          { client: trx }
        )

        return response.ok({
          order: order.toJSON(),
          customer: customer.toJSON(),
        })
      })
    } catch (error) {
      logger.error(error)

      return response.badRequest({
        errors: [{ message: error.message }],
      })
    }
  }

  public async show({ request, response, logger }: HttpContextContract) {
    const id = request.param('id')

    try {
      const order = await Order.query()
        .preload('products', (qp) => qp.preload('file'))
        .where('uuid', id)
        .firstOrFail()

      return { order: order.toJSON() }
    } catch (error) {
      logger.error(error)

      return response.notFound({
        errors: [{ message: error.message }],
      })
    }
  }
}
