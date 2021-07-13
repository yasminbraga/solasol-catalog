import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({ view }: HttpContextContract) {
    try {
      const categories = await Category.all()
      return view.render('categories.index', { categories })
    } catch (error) {
      console.error(error)
    }
  }

  public async create({ view }: HttpContextContract) {
    return view.render('categories.create')
  }

  public async store({ request, response }: HttpContextContract) {
    const { name } = request.only(['name'])

    try {
      await Category.create({ name })
      return response.redirect().toRoute('categories.index')
    } catch (error) {
      console.error(error)
      return response.redirect().back()
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
