import test from 'japa'

import Database from '@ioc:Adonis/Lucid/Database'
import { api } from '../../../utils'
import { CatalogFactory } from 'Database/factories'

test.group('Api AuthController', (group) => {
  group.before(async () => {
    await Database.beginGlobalTransaction()
  })

  group.after(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('should GET in /api/v1/catalogs/:id return a 404 error if catalog not exists', async (assert) => {
    const url = '/v1/catalogs/e840e30b-24f9-4d83-b66c-ad563fa3855f'
    const response = await api.get(url).set('Accept', 'application/json')

    assert.equal(response.status, 404)
    assert.notExists(response.body.catalog)
  })

  test('should GET in /api/v1/catalogs/:id return a 410 error if catalog has expired', async (assert) => {
    const catalog = await CatalogFactory.apply('expired').create()

    const url = `/v1/catalogs/${catalog.uuid}`
    const response = await api.get(url).set('Accept', 'application/json')

    assert.equal(response.status, 410)
    assert.notExists(response.body.catalog)
  })

  test('should GET in /api/v1/catalogs/:id return a catalog if catalog exists', async (assert) => {
    const catalog = await CatalogFactory.create()

    const url = `/v1/catalogs/${catalog.uuid}`
    const response = await api.get(url).set('Accept', 'application/json')

    assert.equal(response.status, 200)
    assert.exists(response.body.catalog)
  })
})
