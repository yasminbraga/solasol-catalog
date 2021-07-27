import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { v4 } from 'uuid'
import { DateTime } from 'luxon'
import Bull from '@ioc:Rocketseat/Bull'

import CatalogExpireJob, { CatalogExpireJobData } from 'App/Jobs/CatalogExpireJob'
import Catalog from 'App/Models/Catalog'

export default class CatalogsController {
  public async index({ view }: HttpContextContract) {
    const catalogs = await Catalog.query()

    return view.render('catalogs/index', {
      catalogs: catalogs.map((i) => i.toJSON()),
    })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('catalogs/create')
  }

  public async store({ request, response, auth, logger, session }: HttpContextContract) {
    const user = auth.user

    if (!user) {
      return response.redirect().toRoute('sessions.index')
    }

    const validationSchema = schema.create({
      validity: schema.number(),
    })

    const { validity } = await request.validate({
      schema: validationSchema,
    })

    const data = {
      expireAt: DateTime.now().plus({ days: validity }),
      uuid: v4(),
      validity,
    }

    try {
      const catalog = await user.related('catalogs').create(data)

      await Bull.schedule<CatalogExpireJobData>(
        new CatalogExpireJob().key,
        { catalogId: catalog.id },
        data.expireAt.toJSDate(),
        {
          jobId: catalog.uuid,
        }
      )

      return response.redirect().toRoute('catalogs.index')
    } catch (error) {
      logger.error(error)
      session.flash('error', error.message)

      return response.redirect().back()
    }
  }

  public async destroy({ request, session, response, logger }: HttpContextContract) {
    const id = request.param('id')

    try {
      const catalog = await Catalog.query().where({ id }).firstOrFail()

      if (!catalog.expired) {
        await Bull.remove(new CatalogExpireJob().key, catalog.uuid)
      }

      await catalog.delete()
      session.flash('success', 'Catálogo removido')

      return response.redirect().toRoute('catalogs.index')
    } catch (error) {
      logger.error(error)
      session.flash('error', error.message)

      return response.redirect().back()
    }
  }
}
