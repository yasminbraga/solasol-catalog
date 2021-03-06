import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'

import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import { ImageUploader } from 'App/Services/ImageUploader'

import formatPriceToNumber from '../../../utils/formatPriceToNumber'

export default class ProductsController {
  public async index({ view, request }: HttpContextContract) {
    const categories = await Category.all()

    let { productSearch, categorySearch } = request.qs()

    const products = await Product.query()
      .preload('category')
      .preload('file')
      .apply((scopes) => {
        scopes.filterByCategories([categorySearch])
        scopes.filterByName(productSearch)
      })

    return view.render('products/index', { products: products.map((i) => i.toJSON()), categories })
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
      price: schema.string(),
      codigo: schema.string.optional(),
      category_id: schema.number([rules.unsigned()]),
      description: schema.string.optional(),
      image: schema.file({ extnames: ['jpg', 'jpeg', 'png'] }),
    })

    const { image, price, ...productData } = await request.validate({
      schema: productValidationSchema,
    })

    if (!image.tmpPath) {
      session.flash('error', 'Erro ao cadastrar produto')

      return response.redirect().back()
    }

    const trx = await Database.transaction()

    try {
      const product = new Product()

      const priceNumber = formatPriceToNumber(price)
      await product.merge({ price: priceNumber, ...productData }).useTransaction(trx)

      const file = await product.related('file').create({ uploaded: false })

      const uploadService = new ImageUploader()

      uploadService.upload(image.tmpPath, {}, async (err, result) => {
        if (err) throw err

        if (result) {
          await file
            .merge({ secureUrl: result.secure_url, publicId: result.public_id, uploaded: true })
            .save()
        }
      })

      await trx.commit()
      session.flash('success', 'Produto cadastrado')
      return response.redirect().toRoute('products.index')
    } catch (error) {
      await trx.rollback()
      logger.error(error)

      session.flash('error', error.message)
      return response.redirect().back()
    }
  }

  public async edit({ request, view, bouncer, logger, session, response }: HttpContextContract) {
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
      logger.error(error)
      session.flash('error', error.message)

      return response.redirect().back()
    }
  }

  public async update({ request, response, session, bouncer, logger }: HttpContextContract) {
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
      price: schema.string(),
      codigo: schema.string.optional(),
      category_id: schema.number([rules.unsigned()]),
      description: schema.string.optional(),
      image: schema.file.optional({ extnames: ['jpg', 'jpeg', 'png'] }),
      available: schema.boolean.optional(),
    })

    const { image, available, price, ...updateProductData } = await request.validate({
      schema: productValidationSchema,
    })

    const service = new ImageUploader()

    try {
      const product = await Product.query().where({ id }).preload('file').firstOrFail()
      const priceNumber = formatPriceToNumber(price)
      await product
        .merge({ price: priceNumber, available: !!available, ...updateProductData })
        .save()

      if (image) {
        if (!image?.tmpPath) {
          session.flash('error', 'Erro ao cadastrar produto')

          return response.redirect().back()
        }

        await product.file.merge({ uploaded: false }).save()

        service.upload(
          image.tmpPath,
          {
            public_id: product.file.publicId.split('/')[1],
          },
          async (err, result) => {
            if (err) throw err

            if (result) {
              await product.file
                .merge({ secureUrl: result.secure_url, publicId: result.public_id, uploaded: true })
                .save()
            }
          }
        )
      }

      session.flash('success', 'Produto atualizado')
      return response.redirect().toRoute('products.index')
    } catch (error) {
      logger.error(error)
      session.flash('error', error.message)

      return response.redirect().back()
    }
  }

  public async destroy({ request, response, session, bouncer, logger }: HttpContextContract) {
    await bouncer.with('AdminPolicy').authorize('adminOnly')

    const id = request.param('id')
    const service = await new ImageUploader()

    try {
      const product = await Product.query().where({ id }).preload('file').firstOrFail()
      const publicId = product.file.publicId

      await product.delete()
      await service.destroy(publicId)

      session.flash('success', 'Produto removido')
      return response.redirect().toRoute('products.index')
    } catch (error) {
      logger.error(error)
      session.flash('error', error.message)

      return response.redirect().back()
    }
  }
}
