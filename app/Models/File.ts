import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo, computed } from '@ioc:Adonis/Lucid/Orm'
import Route from '@ioc:Adonis/Core/Route'

import Product from './Product'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public filename: string

  @column()
  public productId: number

  @computed()
  public get fileNameUrl() {
    return Route.makeUrl('uploads', { filename: this.filename })
  }

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
