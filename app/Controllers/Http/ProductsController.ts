import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Application from '@ioc:Adonis/Core/Application'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import fs from 'fs'

export default class ProductsController {
  public async index({ view }: HttpContextContract) {
    return view.render('products/index')
  }

  public async create({ view }: HttpContextContract) {
    const categories = await Category.all()
    return view.render('products/create', { categories })
  }

  public async store({ request, response, session, logger }: HttpContextContract) {
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
      images: schema.array().members(schema.file({ extnames: ['jpg', 'jpeg', 'png'] })),
    })

    const { images, ...productData } = await request.validate({
      schema: productValidationSchema,
    })

    try {
      const product = await Product.create(productData)

      for (let image of images) {
        await image.move(Application.tmpPath('uploads'), {
          name: `${Application.helpers.cuid()}-${image.clientName}`,
        })
      }

      await product
        .related('files')
        .createMany(images.map((image) => ({ filename: image.fileName })))

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
        .preload('files')
        .firstOrFail()

      return view.render('products/show', { product: product.toJSON() })
    } catch (error) {
      console.error(error)
    }
  }

  public async edit({ request, view }: HttpContextContract) {
    try {
      const product = await Product.query()
        .where({ id: request.param('id') })
        .preload('files')
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

  public async update({ request, response, session }: HttpContextContract) {
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
      images: schema.array.optional().members(schema.file({ extnames: ['jpg', 'jpeg', 'png'] })),
    })

    const { images, ...updateProductData } = await request.validate({
      schema: productValidationSchema,
    })

    try {
      const product = await Product.query().where({ id }).firstOrFail()
      await product.merge(updateProductData).save()

      if (images && images?.length > 0) {
        const files = await product.related('files').query()

        files.map((file) => {
          fs.unlinkSync(Application.tmpPath('uploads', file.filename))
        })

        await product.related('files').query().delete()

        for (let image of images) {
          await image.move(Application.tmpPath('uploads'), {
            name: `${Application.helpers.cuid()}.${image.extname}`,
          })
        }

        await product
          .related('files')
          .createMany(images.map((image) => ({ filename: image.fileName })))

        return response.redirect().toRoute('products.show', { id })
      }
    } catch (error) {
      console.log(error)
      session.flash('error', error.message)

      return response.redirect().back()
    }
  }

  public async destroy({ request, response, session }: HttpContextContract) {
    const id = request.param('id')

    try {
      const product = await Product.query().where({ id }).firstOrFail()
      const files = await product.related('files').query()

      files.map((file) => {
        fs.unlinkSync(Application.tmpPath('uploads', file.filename))
      })

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
