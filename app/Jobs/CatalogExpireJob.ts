import { Job, JobContract } from '@ioc:Rocketseat/Bull'
import Catalog from 'App/Models/Catalog'

/*
|--------------------------------------------------------------------------
| Job setup
|--------------------------------------------------------------------------
|
| This is the basic setup for creating a job, but you can override
| some settings.
|
| You can get more details by looking at the bullmq documentation.
| https://docs.bullmq.io/
*/

export interface CatalogExpireJobData {
  catalogId: number
}

export default class CatalogExpireJob implements JobContract {
  public key = 'CatalogExpireJob'

  public async handle(job: Job<CatalogExpireJobData>) {
    const { data } = job

    const catalog = await Catalog.findOrFail(data.catalogId)

    await catalog.merge({ expired: true }).save()
  }
}
