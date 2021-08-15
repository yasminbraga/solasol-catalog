import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import User from './User'
import Customer from './Customer'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public totalPrice: number

  @column()
  public closed: boolean

  @column()
  public confirmed: boolean

  @column.dateTime()
  public closedAt: DateTime

  @column.dateTime()
  public confirmedAt: DateTime

  @column()
  public uuid: string

  @column()
  public userId: number

  @column()
  public customerId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Customer)
  public customer: BelongsTo<typeof Customer>

  @manyToMany(() => Product)
  public products: ManyToMany<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
