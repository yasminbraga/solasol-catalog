import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Customer from 'App/Models/Customer'

export default class CustomerController {
  public async index({ view }: HttpContextContract) {
    const customers = await Customer.all()
    return view.render('customers/index', {
      customers: customers.map((u) => u.toJSON()),
    })
  }

  public async edit({ logger, request, view }: HttpContextContract) {
    const id = request.param('id')

    try {
      const customer = await Customer.findOrFail(id)

      return view.render('customers/edit', {
        customer: customer.toJSON(),
      })
    } catch (error) {
      logger.error(error)
    }
  }

  public async update({ request, response, logger, session, bouncer }: HttpContextContract) {
    await bouncer.with('AdminPolicy').authorize('adminOnly')
    const id = request.param('id')

    const validationSchema = schema.create({
      name: schema.string(),
      email: schema.string({}, [
        rules.email(),
        rules.unique({
          table: 'customers',
          column: 'email',
          whereNot: { id },
        }),
      ]),
      phone: schema.string(),
    })

    const customerData = await request.validate({
      schema: validationSchema,
    })

    try {
      await Customer.query().where({ id }).update(customerData)
      session.flash('success', 'Cliente atualizado')

      return response.redirect().toRoute('customers.index')
    } catch (error) {
      logger.error(error)
      session.flash('error', error.message)

      return response.redirect().back()
    }
  }
}
