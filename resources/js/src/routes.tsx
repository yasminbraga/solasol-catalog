import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, BrowserRouter, Route } from 'react-router-dom'

import CatalogPage from './pages/Catalog'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/catalogs/:id" exact component={CatalogPage} />

        <Route path="*" render={() => <h2>404 - Not Found</h2>} />
      </Switch>
    </BrowserRouter>
  )
}

const container = document.querySelector('#react-catalog-app')
if (container) ReactDOM.render(<Routes />, container)
