import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo, beforeDelete } from '@ioc:Adonis/Lucid/Orm'

import Product from './Product'
import { ImageUploader } from 'App/Services/ImageUploader'

export default class File extends BaseModel {
  @beforeDelete()
  public static async deleteAssociatedImageFromStorageService(file: File) {
    const service = await new ImageUploader()

    service.destroy(file.publicId)
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public secureUrl: string

  @column()
  public productId: number

  @column()
  public publicId: string

  @column()
  public uploaded: boolean

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
