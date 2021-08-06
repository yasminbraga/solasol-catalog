import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrdersController {
  public async index({ view }: HttpContextContract) {
    const orders = [
      {
        id: 1,
        codigo: 'GF43D',
        client: 'Yasmin Braga',
        total: 'R$122,00',
        openedDate: '12/12/12',
        closeDate: '-',
        status: 'opened',
      },

      {
        id: 2,
        codigo: 'GF43D',
        client: 'Rosa Teixeira',
        total: 'R$122,00',
        openedDate: '12/12/12',
        closeDate: '-',
        status: 'effectuated',
      },

      {
        id: 3,
        codigo: 'GF43D',
        client: 'Daniel Braga',
        total: 'R$122,00',
        openedDate: '12/12/12',
        closeDate: '-',
        status: 'confirmed',
      },

      {
        id: 4,
        codigo: 'GF43D',
        client: 'Rosa Braga',
        total: 'R$122,00',
        openedDate: '12/12/12',
        closeDate: '-',
        status: 'confirmed',
      },
    ]

    return view.render('orders/index', { orders })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({ view }: HttpContextContract) {
    const order = {
      id: 1,
      codigo: 'GF43D',
      client: 'Yasmin Braga',
      phone: '93991984818',
      total: 'R$122,00',
      openedDate: '12/12/12',
      closeDate: '-',
      status: 'opened',
      products: [
        {
          name: 'óculos de sol',
          image:
            'https://photos.enjoei.com.br/kit-oculos-gatinho-e-luvas-retro-vintage-anos-60-rockabilly-hepburn-pin-up/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84OTQxMzg2LzRiNjgwZmNkZmU5ZjE4NzBlYTYzZGE1YjE3M2YzYmNlLmpwZw',
          code: '-',
          category: 'óculos',
          quantity: 12,
          price: 'R$10,00',
          total: 'R$120,00',
        },
        {
          name: 'óculos de sol',
          image:
            'https://photos.enjoei.com.br/kit-oculos-gatinho-e-luvas-retro-vintage-anos-60-rockabilly-hepburn-pin-up/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84OTQxMzg2LzRiNjgwZmNkZmU5ZjE4NzBlYTYzZGE1YjE3M2YzYmNlLmpwZw',
          code: '-',
          category: 'óculos',
          quantity: 12,
          price: 'R$10,00',
          total: 'R$120,00',
        },
      ],
    }

    return view.render('orders/show', { order })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
