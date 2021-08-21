import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  computed,
  ManyToMany,
  manyToMany,
  scope,
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

  @column.dateTime({
    serialize: (value: DateTime) => {
      return value ? value.toFormat('dd/MM/yyyy') : value
    },
  })
  public closedAt: DateTime

  @column.dateTime({
    serialize: (value: DateTime) => {
      return value ? value.toFormat('dd/MM/yyyy') : value
    },
  })
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

  @manyToMany(() => Product, {
    pivotColumns: ['quantity'],
  })
  public products: ManyToMany<typeof Product>

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => {
      return value ? value.toFormat('dd/MM/yyyy') : value
    },
  })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @computed()
  public get number() {
    return String(this.id).padStart(5, '0')
  }

  @computed()
  public get status() {
    return this.confirmed ? 'confirmado' : this.closed ? 'fechado' : 'aberto'
  }

  public static confirmed = scope((query) => {
    query.where({ confirmed: true })
  })

  public static closed = scope((query) => {
    query.where({ closed: true, confirmed: false })
  })

  public static byStatus = scope((query, status: 'open' | 'closed' | 'confirmed' = 'open') => {
    switch (status) {
      case 'closed':
        query.where({ closed: true, confirmed: false })
        break
      case 'confirmed':
        query.where({ confirmed: true })
        break
      case 'open':
      default:
        query.where({ closed: false, confirmed: false })
    }
  })
}
