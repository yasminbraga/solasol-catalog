import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, BrowserRouter, Route } from 'react-router-dom'

import CatalogPage from './pages/Catalog'
import GlobalStyle from './styles/globals'

import HeaderProvider from './providers/header'
import NotFound from './pages/NotFound'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <HeaderProvider>
        <Switch>
          <Route path="/catalogs/:id" exact component={CatalogPage} />

          <Route path="*" component={NotFound} />
        </Switch>
      </HeaderProvider>
    </BrowserRouter>
  )
}

const container = document.querySelector('#react-catalog-app')
if (container) ReactDOM.render(<Routes />, container)
