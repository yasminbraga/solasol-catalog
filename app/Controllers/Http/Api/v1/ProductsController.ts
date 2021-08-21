import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index({ request, response, logger }: HttpContextContract) {
    const { page, limit, categoryIds, name } = request.qs()

    try {
      const products = await Product.query()
        .preload('file')
        .apply((scopes) => {
          scopes.filterByCategories(categoryIds)
          scopes.filterByName(name)
        })
        .paginate(page || 1, limit || 20)

      return {
        products: products.toJSON(),
      }
    } catch (error) {
      logger.error(error)

      return response.notFound()
    }
  }
}
