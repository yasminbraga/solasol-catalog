import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Catalog from 'App/Models/Catalog'

export default class CatalogsController {
  public async index() {
    return { ok: true }
  }

  public async show({ request, response }: HttpContextContract) {
    const uuid = request.param('id')

    try {
      const catalog = await Catalog.findByOrFail('uuid', uuid)

      if (catalog.expired) {
        return response.gone()
      }

      return { catalog: catalog.toJSON() }
    } catch (error) {
      console.log(error)

      return response.notFound({
        errors: [{ message: error.message }],
      })
    }
  }
}
