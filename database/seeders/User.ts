import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'Yasmin Braga',
        email: 'yasminbragateixeira@gmail.com',
        password: '123456',
        isAdmin: true,
      },
      {
        name: 'Dalton Felipe',
        email: 'daltonphellipe@gmail.com',
        password: 'dalton10',
        isAdmin: true,
      },
      {
        name: 'Not Admin',
        email: 'notadmin@gmail.com',
        password: '123456',
        isAdmin: false,
      },
    ])
  }
}
