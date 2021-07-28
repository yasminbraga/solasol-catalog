import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, BrowserRouter, Route } from 'react-router-dom'

import Header from './components/Header'
import MainCard from './components/MainCard'

import CatalogPage from './pages/Catalog'
import GlobalStyle, { Container } from './styles/globals'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Container>
        <MainCard>
          <Switch>
            <Route path="/catalogs/:id" exact component={CatalogPage} />

            <Route path="*" render={() => <h2>404 - Not Found</h2>} />
          </Switch>
        </MainCard>
      </Container>
    </BrowserRouter>
  )
}

const container = document.querySelector('#react-catalog-app')
if (container) ReactDOM.render(<Routes />, container)
