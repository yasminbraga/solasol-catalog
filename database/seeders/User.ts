import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.create({
      email: 'yasminbragateixeira@gmail.com',
      password: '123456',
    })
  }
}
