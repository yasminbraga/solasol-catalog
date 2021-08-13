import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

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

  @manyToMany(() => Product)
  public products: ManyToMany<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
