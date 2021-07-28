import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Catalog from 'App/Models/Catalog'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index({ request, response, logger }: HttpContextContract) {
    const catalogUuid = request.param('catalog_id')

    try {
      const catalog = await Catalog.findByOrFail('uuid', catalogUuid)

      if (catalog.expired) {
        return response.gone()
      }

      const products = await Product.query().preload('file')

      return {
        products: products.map((i) => i.toJSON()),
        catalog: catalog.toJSON(),
      }
    } catch (error) {
      logger.error(error)

      return response.notFound()
    }
  }
}
