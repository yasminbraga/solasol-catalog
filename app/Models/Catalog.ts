import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Catalog extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public expireAt: DateTime

  @column()
  public expired: boolean

  @column()
  public uuid: string

  @column()
  public userId: number

  @column()
  public validity: number

  @column()
  public views: number

  @column()
  public customerId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @computed({ serializeAs: 'validity_humanized' })
  public get validityHumanized() {
    return this.validity > 1 ? `${this.validity} dias` : `${this.validity} dia`
  }

  @computed({ serializeAs: 'expire_at_formatted' })
  public get expireAtFormatted() {
    return this.expireAt.toFormat('dd/MM/yyyy - HH:mm:ss')
  }

  @computed({ serializeAs: 'signed_url' })
  public get signedUrl() {
    return `/catalogos/${this.uuid}`
  }

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => {
      return value ? value.toFormat('dd/MM/yyyy - HH:mm:ss') : value
    },
  })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
