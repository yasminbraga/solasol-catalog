import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Application from '@ioc:Adonis/Core/Application'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index({ view }: HttpContextContract) {
    const products = await Product.query().preload('category')
    return view.render('products/index', { products: products.map((i) => i.toJSON()) })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('AdminPolicy').authorize('adminOnly')

    const categories = await Category.all()
    return view.render('products/create', { categories })
  }

  public async store({ request, response, session, logger, bouncer }: HttpContextContract) {
    await bouncer.with('AdminPolicy').authorize('adminOnly')

    const productValidationSchema = schema.create({
      name: schema.string({}, [
        rules.unique({
          table: 'products',
          column: 'name',
          caseInsensitive: false,
        }),
      ]),
      price: schema.number([rules.unsigned()]),
      codigo: schema.string.optional(),
      category_id: schema.number([rules.unsigned()]),
      description: schema.string.optional(),
      image: schema.file({ extnames: ['jpg', 'jpeg', 'png'] }),
    })

    const { image, ...productData } = await request.validate({
      schema: productValidationSchema,
    })

    try {
      const product = await Product.create(productData)

      await image.move(Application.tmpPath('uploads'), {
        name: `${Application.helpers.cuid()}-${image.clientName}`,
      })

      await product.related('file').create({ filename: image.fileName })

      session.flash('success', 'Produto cadastrado')
      return response.redirect().toRoute('products.show', { id: product.id })
    } catch (error) {
      logger.error(error)

      session.flash('error', error.message)
      return response.redirect().back()
    }
  }

  public async show({ request, view }: HttpContextContract) {
    try {
      const product = await Product.query()
        .where({ id: request.param('id') })
        .preload('file')
        .firstOrFail()

      return view.render('products/show', { product: product.toJSON() })
    } catch (error) {
      console.error(error)
    }
  }

  public async edit({ request, view, bouncer }: HttpContextContract) {
    await bouncer.with('AdminPolicy').authorize('adminOnly')

    try {
      const product = await Product.query()
        .where({ id: request.param('id') })
        .preload('file')
        .firstOrFail()

      const categories = await Category.all()

      return view.render('products/edit', {
        product: product.toJSON(),
        categories: categories.map((i) => i.toJSON()),
      })
    } catch (error) {
      console.error(error)
    }
  }

  public async update({ request, response, session, bouncer }: HttpContextContract) {
    await bouncer.with('AdminPolicy').authorize('adminOnly')

    const id = request.param('id')
    const productValidationSchema = schema.create({
      name: schema.string({}, [
        rules.unique({
          table: 'products',
          column: 'name',
          caseInsensitive: false,
          whereNot: {
            id,
          },
        }),
      ]),
      price: schema.number([rules.unsigned()]),
      codigo: schema.string.optional(),
      category_id: schema.number([rules.unsigned()]),
      description: schema.string.optional(),
      image: schema.file.optional({ extnames: ['jpg', 'jpeg', 'png'] }),
    })

    const { image, ...updateProductData } = await request.validate({
      schema: productValidationSchema,
    })

    try {
      const product = await Product.query().where({ id }).preload('file').firstOrFail()
      await product.merge(updateProductData).save()

      if (image) {
        await image.move(Application.tmpPath('uploads'), {
          name: product.file.filename,
          overwrite: true,
        })
      }

      return response.redirect().toRoute('products.show', { id })
    } catch (error) {
      console.log(error)
      session.flash('error', error.message)

      return response.redirect().back()
    }
  }

  public async destroy({ request, response, session, bouncer }: HttpContextContract) {
    await bouncer.with('AdminPolicy').authorize('adminOnly')

    const id = request.param('id')

    try {
      const product = await Product.query().where({ id }).preload('file').firstOrFail()

      await product.file.delete()
      await product.delete()

      session.flash('success', 'Produto removido')
      return response.redirect().toRoute('products.index')
    } catch (error) {
      console.log(error)
      session.flash('error', error.message)

      return response.redirect().back()
    }
  }
}
