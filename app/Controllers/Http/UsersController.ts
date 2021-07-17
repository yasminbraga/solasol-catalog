import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ view }: HttpContextContract) {
    const users = await User.all() // trocar pelo paginate depois
    return view.render('users/index', {
      users: users.map((u) => u.toJSON()),
    })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('users/create')
  }

  public async store({ request, response, logger }: HttpContextContract) {
    const validationSchema = schema.create({
      email: schema.string({}, [rules.email()]),
      password: schema.string({}, [rules.confirmed('password_confirmation')]),
    })

    const userData = await request.validate({
      schema: validationSchema,
      messages: {
        'required': 'Preencha este campo',
        'password_confirmation.confirmed': 'As senhas não conferem',
      },
    })

    try {
      await User.create(userData)
      return response.redirect().toRoute('users.index')
    } catch (error) {
      logger.error(error)
      return response.redirect().back()
    }
  }

  public async edit({ view, request, response, logger }: HttpContextContract) {
    const id = request.param('id')

    try {
      const user = await User.findOrFail(id)

      return view.render('users/edit', {
        user: user.toJSON(),
      })
    } catch (error) {
      logger.error(error)
      return response.redirect().back()
    }
  }

  public async update({ request, response, logger }: HttpContextContract) {
    const id = request.param('id')

    const validationSchema = schema.create({
      email: schema.string({}, [
        rules.email(),
        rules.unique({
          table: 'users',
          column: 'email',
          whereNot: { id },
        }),
      ]),
      password: schema.string.optional({}, [rules.confirmed('password_confirmation')]),
    })

    const userData = await request.validate({
      schema: validationSchema,
      messages: {
        'required': 'Preencha este campo',
        'password_confirmation.confirmed': 'As senhas não conferem',
      },
    })

    try {
      await User.query().where({ id }).update(userData)
      return response.redirect().toRoute('users.index')
    } catch (error) {
      logger.error(error)
      return response.redirect().back()
    }
  }
}
