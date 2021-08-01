import test from 'japa'
import { ImageUploader } from 'App/Services/ImageUploader'
import Aplication from '@ioc:Adonis/Core/Application'
import cloudinary from 'cloudinary'

test.group('Services ImageUploader', (group) => {
  group
    .after(async () => {
      cloudinary.v2.api.delete_resources_by_prefix('solasol_catalog_test')
      cloudinary.v2.api.delete_folder('solasol_catalog_test')
    })
    .timeout(0)

  test('should ImageUploader.upload upload an image and returns a response of uploaded image', async (assert) => {
    const image = Aplication.makePath('/tests/assets/image.jpg')
    const service = new ImageUploader()
    const upload = await service.upload(image)

    assert.exists(upload, 'public_id')
    assert.exists(upload, 'secure_url')
  }).timeout(0)

  test('ImageUploader.destroy deletes an image and returns a response', async (assert) => {
    const image = Aplication.makePath('/tests/assets/image.jpg')
    const service = new ImageUploader()
    const uploaded = await service.upload(image)

    assert.exists(uploaded, 'public_id')
    assert.exists(uploaded, 'secure_url')

    const deleted = await service.destroy(uploaded.public_id)
    assert.propertyVal(deleted, 'result', 'ok')
  }).timeout(0)
})
