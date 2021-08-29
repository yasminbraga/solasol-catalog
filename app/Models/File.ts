import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

import Product from './Product'
export default class File extends BaseModel {
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
