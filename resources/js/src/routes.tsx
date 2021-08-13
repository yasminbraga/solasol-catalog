import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'

import CatalogPage from './pages/Catalog'
import OrdersPage from './pages/Oders'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import CreateOrders from './pages/CreateOrders'

interface RouteList {
  exact?: boolean
  path: string
  component: React.FC
  headerShown: boolean
}

const routes: RouteList[] = [
  {
    path: '/catalogos/:id',
    component: CatalogPage,
    headerShown: true,
  },
  {
    path: '/pedidos/create',
    component: CreateOrders,
    headerShown: true,
  },
  {
    path: '/pedidos/:id',
    component: OrdersPage,
    headerShown: true,
  },
  {
    path: '*',
    component: NotFound,
    headerShown: false,
  },
]

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, index) => {
          return (
            <Route key={index} path={route.path}>
              {route.headerShown ? <Header /> : null}
            </Route>
          )
        })}
      </Switch>

      <Switch>
        {routes.map((route, index) => {
          return <Route key={index} component={route.component} path={route.path} />
        })}
      </Switch>
    </BrowserRouter>
  )
}
