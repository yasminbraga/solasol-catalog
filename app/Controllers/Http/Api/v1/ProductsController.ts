import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Catalog from 'App/Models/Catalog'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index({ request, response, logger }: HttpContextContract) {
    const catalogUuid = request.param('catalog_id')
    const { page, limit, categoryIds, name } = request.qs()

    try {
      const catalog = await Catalog.findByOrFail('uuid', catalogUuid)

      if (catalog.expired) {
        return response.gone()
      }

      let query = Product.query().preload('file')

      if (categoryIds) {
        query = query.whereIn('category_id', categoryIds)
      }

      if (name) {
        query = query.where('name', 'ilike', `%${name}%`)
      }

      const products = await query.paginate(page || 1, limit || 20)

      return {
        products: products.toJSON(),
        catalog: catalog.toJSON(),
      }
    } catch (error) {
      logger.error(error)

      return response.notFound()
    }
  }
}
