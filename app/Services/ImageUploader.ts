import cloudinary from 'cloudinary'
import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'

export class ImageUploader {
  constructor() {
    cloudinary.v2.config({
      cloud_name: Env.get('CLOUDINARY_NAME'),
      api_key: Env.get('CLOUDINARY_API_KEY'),
      api_secret: Env.get('CLOUDINARY_API_SECRET'),
      secure: true,
    })
  }

  public async upload(
    file: string,
    options?: cloudinary.UploadApiOptions,
    callback?: cloudinary.UploadResponseCallback
  ) {
    const folder = Application.inProduction
      ? 'solasol_catalog_prod'
      : Env.get('NODE_ENV') === 'testing'
      ? 'solasol_catalog_test'
      : 'solasol_catalog_dev'

    const res = await cloudinary.v2.uploader.upload(
      file,
      options ? { folder: folder, ...options } : { folder: folder },
      callback
    )

    return res
  }

  public async destroy(publicId: string, callback?: cloudinary.ResponseCallback) {
    const res = await cloudinary.v2.uploader.destroy(publicId, callback)

    return res
  }
}
