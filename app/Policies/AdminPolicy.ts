import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class AdminPolicy extends BasePolicy {
  public async adminOnly(user: User) {
    return user.isAdmin
  }
}
