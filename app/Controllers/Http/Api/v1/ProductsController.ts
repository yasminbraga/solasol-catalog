import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Catalog from 'App/Models/Catalog'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index({ request, response, logger }: HttpContextContract) {
    const catalogUuid = request.param('catalog_id')
    // const { page } = request.qs()

    try {
      const catalog = await Catalog.findByOrFail('uuid', catalogUuid)

      if (catalog.expired) {
        return response.gone()
      }

      const products = await Product.query().preload('file')
      // .paginate(page || 1)

      return {
        products: products.map((i) => i.toJSON()), //.getUrlsForRange(1, 5),
        catalog: catalog.toJSON(),
      }
    } catch (error) {
      logger.error(error)

      return response.notFound()
    }
  }
}
