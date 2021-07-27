import test from 'japa'

import Database from '@ioc:Adonis/Lucid/Database'
import { api } from '../../../utils'

test.group('Api AuthController', (group) => {
  group.before(async () => {
    await Database.beginGlobalTransaction()
  })

  group.after(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('should GET in /api/v1/catalogs/:id return an error if catalog id not exists', async (assert) => {
    const url = '/v1/catalogs/e840e30b-24f9-4d83-b66c-ad563fa3855f'
    const response = await api.get(url).set('Accept', 'application/json')

    assert.equal(response.status, 404)
  })
})
