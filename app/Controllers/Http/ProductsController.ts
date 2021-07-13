import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Application from '@ioc:Adonis/Core/Application'

import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import File from 'App/Models/File'

export default class ProductsController {
  public async index({ view }: HttpContextContract) {
    return view.render('products/index')
  }

  public async create({ view }: HttpContextContract) {
    const categories = await Category.all()
    return view.render('products/create', { categories })
  }

  public async store({ request, response }: HttpContextContract) {
    const product = request.all()
    const images = request.files('image')

    try {
      //criar o produto e retornar o id
      const productCreated = await Product.create(product)

      // salvar o arquivo na pasta upload
      for (let image of images) {
        await image.move(Application.tmpPath('uploads'), {
          name: `${Date.now()}-${image.clientName}`,
        })
      }
      // Salvar o arquivo no banco de dados
      await Promise.all(
        images.map(async (image) =>
          File.create({ filename: image.fileName, productId: productCreated.id })
        )
      )
      return response.redirect().toRoute('ProductsController.show', { id: productCreated.id })
    } catch (error) {
      console.error(error)
    }
  }

  public async show({ request, view }: HttpContextContract) {
    const id = request.param('id')
    const product = await Product.query().where({ id }).preload('files').firstOrFail()
    return view.render('products/show', { product })
  }

  public async edit({ request, view }: HttpContextContract) {
    const productId = request.param('id')
    const product = await Product.find(productId)
    const categories = Category.all()

    return view.render('products/edit', { product, categories })
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
