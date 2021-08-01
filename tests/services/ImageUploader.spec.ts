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

  test
    .only('test ImageUploader', async (assert) => {
      const image = Aplication.makePath('/tests/assets/image.jpg')
      const service = new ImageUploader()
      const upload = await service.upload(image)

      console.log(upload)

      assert.exists(upload, 'public_id')
      assert.exists(upload, 'secure_url')
    })
    .timeout(0)
})
