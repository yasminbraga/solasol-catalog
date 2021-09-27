/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'

Route.get('/', async ({ response }) => {
  return response.redirect().toRoute(
    'orders.index',
    {},
    {
      qs: {
        status: 'closed',
      },
    }
  )
})

Route.resource('sessions', 'SessionsController').only(['index', 'store', 'destroy'])

Route.group(() => {
  Route.resource('products', 'ProductsController')
  Route.resource('customers', 'CustomersController')
  Route.resource('users', 'UsersController')
  Route.resource('categories', 'CategoriesController')
  Route.resource('catalogs', 'CatalogsController').only(['index', 'create', 'store', 'destroy'])
  Route.post('orders/:id/confirm', 'OrdersController.confirm').as('orders.confirm')
  Route.resource('orders', 'OrdersController')
}).middleware(['auth'])

Route.group(() => {
  Route.group(() => {
    Route.resource('catalogs', 'CatalogsController').only(['show'])
    Route.resource('products', 'ProductsController').only(['index'])
    Route.resource('categories', 'CategoriesController').only(['index'])
    Route.resource('orders', 'OrdersController').only(['store', 'update', 'show'])
    Route.resource('close-orders', 'CloseOrdersController').only(['update'])
    Route.resource('orders.products', 'OrderProductsController').only([
      'store',
      'update',
      'destroy',
    ])
  })
    .prefix('v1')
    .as('v1')
})
  .namespace('App/Controllers/Http/Api/v1')
  .prefix('api')
  .as('api')

Route.get('uploads/:filename', async ({ params, response }) => {
  return response.attachment(Application.tmpPath('uploads', params.filename))
}).as('uploads')

Route.on('*').render('app')
