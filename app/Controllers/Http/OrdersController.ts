import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import Product from 'App/Models/Product'

function calculateTotalPrice(products: Product[]) {
  if (!products.length) return 0

  return products.map((product) => +product.price * product.quantity).reduce((pv, cp) => pv + cp)
}

function calculateTotalQuantity(products: Product[]) {
  if (!products.length) return 0

  return products.map((product) => product.quantity).reduce((pv, cp) => pv + cp)
}

export default class OrdersController {
  public async index({ request, view, response, session, auth }: HttpContextContract) {
    const { status } = request.qs()

    if (!auth.user) {
      session.flash('error', 'Você não possui permissão para acessar este recurso')

      return response.redirect().toRoute('sessions.index')
    }

    const user = auth.user

    const orders = await user
      .related('orders')
      .query()
      .apply((scopes) => scopes.byStatus(status))
      .preload('products')
      .preload('customer')
      .preload('user')

    const closedOrders = await user
      .related('orders')
      .query()
      .preload('customer')
      .apply((scopes) => scopes.closed())

    const totalPrices = orders.map((order) => {
      if (!order.products.length) return 0

      return order.products
        .map((product) => product.toJSON())
        .map((product) => {
          return product.quantity * product.price
        })
        .reduce((pv, cp) => pv + cp)
    })

    return view.render('orders/index', {
      orders: orders.map((item, index) => ({ ...item.toJSON(), total: totalPrices[index] ?? 0 })),
      closedOrders: closedOrders.map((i) => i.toJSON()),
    })
  }

  public async show({ request, response, view, logger, session }: HttpContextContract) {
    const id = request.param('id')

    try {
      const order = await Order.query()
        .where({ id })
        .preload('customer')
        .preload('products', (qp) => qp.preload('file'))
        .preload('user')
        .firstOrFail()

      return view.render('orders/show', {
        order: order.toJSON(),
        totalQuantity: calculateTotalQuantity(order.toJSON().products),
        totalPrice: calculateTotalPrice(order.toJSON().products),
      })
    } catch (error) {
      logger.error(error)
      session.flash('error', error.message)

      return response.redirect().back()
    }
  }

  public async confirm({ request, response, session, logger }: HttpContextContract) {
    const id = request.param('id')

    try {
      const order = await Order.findOrFail(id)
      await order.merge({ confirmed: true }).save()
      session.flash('success', 'Pedido confirmado')

      return response.redirect().back()
    } catch (error) {
      logger.error(error)
      session.flash('error', error.message)

      return response.redirect().back()
    }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({ request, response, session, logger }: HttpContextContract) {
    const id = request.param('id')

    try {
      await Order.query().where({ id }).delete()
      session.flash('success', 'Pedido deletado')

      return response.redirect().toRoute('orders.index', {
        qs: {
          status: 'opened',
        },
      })
    } catch (error) {
      logger.error(error)
      session.flash('error', error.message)

      return response.redirect().back()
    }
  }
}
