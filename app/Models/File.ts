import { DateTime } from 'luxon'
import {
  BaseModel,
  belongsTo,
  column,
  BelongsTo,
  computed,
  afterDelete,
} from '@ioc:Adonis/Lucid/Orm'

import Application from '@ioc:Adonis/Core/Application'
import Route from '@ioc:Adonis/Core/Route'
import Product from './Product'
import fs from 'fs'

export default class File extends BaseModel {
  @afterDelete()
  public static async deleteAssociatedImageFromDisk(file: File) {
    console.log(file)
    fs.unlinkSync(Application.tmpPath('uploads', file.filename))
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public filename: string

  @column()
  public productId: number

  @computed()
  public get fileNameUrl() {
    if (this.filename.includes('http')) return this.filename

    return Route.makeUrl('uploads', { filename: this.filename })
  }

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
