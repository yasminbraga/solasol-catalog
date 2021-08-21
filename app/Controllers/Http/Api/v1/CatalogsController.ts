import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Catalog from 'App/Models/Catalog'

export default class CatalogsController {
  public async show({ request, response, logger }: HttpContextContract) {
    const uuid: string = request.param('id')

    try {
      const catalog = await Catalog.findByOrFail('uuid', uuid)

      if (catalog.expired) {
        return response.gone()
      }

      return { catalog: catalog.toJSON() }
    } catch (error) {
      logger.error(error)

      return response.notFound({
        errors: [{ message: error.message }],
      })
    }
  }
}
