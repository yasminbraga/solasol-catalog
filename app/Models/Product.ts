import { DateTime } from 'luxon'
import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  HasOne,
  hasOne,
  ManyToMany,
  manyToMany,
  scope,
} from '@ioc:Adonis/Lucid/Orm'

import Category from 'App/Models/Category'
import File from 'App/Models/File'
import Order from 'App/Models/Order'

export default class Product extends BaseModel {
  public quantity: number

  public serializeExtras() {
    return { quantity: this.$extras.pivot_quantity }
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public codigo: string

  @column()
  public available: boolean

  @column()
  public description: string

  @column()
  public categoryId: number

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @hasOne(() => File)
  public file: HasOne<typeof File>

  @manyToMany(() => Order)
  public orders: ManyToMany<typeof Order>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static filterByCategories = scope((query, categoryIds) => {
    if (categoryIds) query.whereIn('category_id', categoryIds)
  })

  public static filterByName = scope((query, name) => {
    if (name) query.where('name', 'ilike', `%${name}%`)
  })
}
