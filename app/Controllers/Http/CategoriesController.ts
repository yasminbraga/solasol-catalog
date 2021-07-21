import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Category from 'App/Models/Category'
import Product from 'App/Models/Product'

export default class CategoriesController {
  protected _validationMessages = {
    required: 'Preencha este campo',
  }

  public async index({ view }: HttpContextContract) {
    try {
      const categories = await Category.query()
      return view.render('categories/index', { categories })
    } catch (error) {
      console.error(error)
    }
  }

  public async create({ view }: HttpContextContract) {
    return view.render('categories/create')
  }

  public async store({ logger, request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      name: schema.string({}),
    })

    const categoryData = await request.validate({
      schema: validationSchema,
      messages: this._validationMessages,
    })

    try {
      await Category.create(categoryData)
      return response.redirect().toRoute('categories.index')
    } catch (error) {
      logger.error(error)
      return response.redirect().back()
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({ logger, response, request, view }: HttpContextContract) {
    const id = request.param('id')
    try {
      const category = await Category.findOrFail(id)
      return view.render('categories/edit', { category })
    } catch (error) {
      logger.error(error)
      return response.redirect().back()
    }
  }

  public async update({ request, response, logger }: HttpContextContract) {
    const id = request.param('id')

    const validationSchema = schema.create({
      name: schema.string({}),
    })

    const categoryData = await request.validate({
      schema: validationSchema,
      messages: this._validationMessages,
    })

    try {
      await Category.query().where({ id }).update(categoryData)
      return response.redirect().toRoute('categories.index')
    } catch (error) {
      logger.error(error)
      return response.redirect().back()
    }
  }

  public async destroy({ request, response, session }: HttpContextContract) {
    const id = request.param('id')

    try {
      const category = await Category.query().where({ id }).preload('products').firstOrFail()
      console.log(category)
      if (category.products.length !== 0) {
        session.flash('error', 'Existe produto com essa categoria!')
        return response.redirect().back()
      } else {
        await category.delete()
        return response.redirect().toRoute('categories.index')
      }
    } catch (error) {
      console.log(error)
      session.flash('error', error.message)

      return response.redirect().back()
    }
  }
}
